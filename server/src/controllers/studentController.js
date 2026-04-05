import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

export async function getStudentProfile(req, res, next) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({ student });
  } catch (error) {
    next(error);
  }
}

export async function updateStudentProfile(req, res, next) {
  try {
    const { name, email, phone, branch, cgpa, skills } = req.body;

    const updated = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        phone,
        branch,
        cgpa: cgpa ? Number(cgpa) : null,
        skills,
        user: {
          update: {
            name,
            email
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({
      message: "Profile updated successfully.",
      student: updated
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(StatusCodes.CONFLICT).json({ message: "Email is already in use." });
    }

    next(error);
  }
}

export async function uploadStudentResume(req, res, next) {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Resume file is required." });
    }

    const student = await prisma.student.update({
      where: { userId: req.user.id },
      data: {
        resume: `/uploads/${req.file.filename}`
      }
    });

    res.status(StatusCodes.OK).json({
      message: "Resume uploaded successfully.",
      resume: student.resume
    });
  } catch (error) {
    next(error);
  }
}

export async function getJobs(req, res, next) {
  try {
    const jobs = await prisma.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        recruiter: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        applications:
          req.user.role === "STUDENT"
            ? {
                where: {
                  student: {
                    userId: req.user.id
                  }
                },
                select: {
                  id: true,
                  status: true
                }
              }
            : false
      }
    });

    res.status(StatusCodes.OK).json({ jobs });
  } catch (error) {
    next(error);
  }
}

export async function applyForJob(req, res, next) {
  try {
    const jobId = Number(req.params.jobId);
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    if (!student) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Student profile not found." });
    }

    if (!student.resume) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Please upload your resume before applying." });
    }

    const job = await prisma.company.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found." });
    }

    if (student.cgpa !== null && student.cgpa !== undefined && student.cgpa < job.cgpaRequired) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: `This role requires a minimum CGPA of ${job.cgpaRequired}.`
      });
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        studentId_companyId: {
          studentId: student.id,
          companyId: jobId
        }
      }
    });

    if (existingApplication) {
      return res.status(StatusCodes.CONFLICT).json({ message: "You have already applied for this job." });
    }

    const application = await prisma.application.create({
      data: {
        studentId: student.id,
        companyId: jobId
      }
    });

    res.status(StatusCodes.CREATED).json({
      message: "Application submitted successfully.",
      application
    });
  } catch (error) {
    next(error);
  }
}

export async function getApplications(req, res, next) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const applications = await prisma.application.findMany({
      where: {
        studentId: student.id
      },
      orderBy: {
        appliedAt: "desc"
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
            role: true,
            package: true,
            location: true,
            cgpaRequired: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({ applications });
  } catch (error) {
    next(error);
  }
}

export async function getStudentDashboard(req, res, next) {
  try {
    const student = await prisma.student.findUnique({
      where: { userId: req.user.id }
    });

    const [totalJobs, totalApplications, shortlisted, selected] = await Promise.all([
      prisma.company.count(),
      prisma.application.count({ where: { studentId: student.id } }),
      prisma.application.count({ where: { studentId: student.id, status: "SHORTLISTED" } }),
      prisma.application.count({ where: { studentId: student.id, status: "SELECTED" } })
    ]);

    res.status(StatusCodes.OK).json({
      stats: {
        totalJobs,
        totalApplications,
        shortlisted,
        selected
      }
    });
  } catch (error) {
    next(error);
  }
}
