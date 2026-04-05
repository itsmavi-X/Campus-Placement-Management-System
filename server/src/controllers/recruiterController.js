import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

export async function createJob(req, res, next) {
  try {
    const { role, cgpaRequired, package: offeredPackage, location, description } = req.body;

    if (!role || !cgpaRequired || !offeredPackage || !location) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Role, CGPA criteria, package, and location are required."
      });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const job = await prisma.company.create({
      data: {
        recruiterId: recruiter.id,
        name: recruiter.companyName,
        role,
        cgpaRequired: Number(cgpaRequired),
        package: offeredPackage,
        location,
        description
      }
    });

    res.status(StatusCodes.CREATED).json({
      message: "Job created successfully.",
      job
    });
  } catch (error) {
    next(error);
  }
}

export async function getRecruiterJobs(req, res, next) {
  try {
    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const jobs = await prisma.company.findMany({
      where: { recruiterId: recruiter.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: {
            applications: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({ jobs });
  } catch (error) {
    next(error);
  }
}

export async function getApplicantsByJob(req, res, next) {
  try {
    const jobId = Number(req.params.jobId);
    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const job = await prisma.company.findFirst({
      where: {
        id: jobId,
        recruiterId: recruiter.id
      }
    });

    if (!job) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Job not found for this recruiter." });
    }

    const applicants = await prisma.application.findMany({
      where: {
        companyId: jobId
      },
      orderBy: {
        appliedAt: "desc"
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        company: {
          select: {
            name: true,
            role: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({ applicants });
  } catch (error) {
    next(error);
  }
}

export async function updateApplicationStatus(req, res, next) {
  try {
    const { applicationId, status } = req.body;

    if (!applicationId || !["APPLIED", "SHORTLISTED", "REJECTED", "SELECTED"].includes(status)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "A valid applicationId and status are required."
      });
    }

    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const application = await prisma.application.findUnique({
      where: { id: Number(applicationId) },
      include: {
        company: true
      }
    });

    if (!application || application.company.recruiterId !== recruiter.id) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Application not found." });
    }

    const updated = await prisma.application.update({
      where: { id: Number(applicationId) },
      data: { status }
    });

    res.status(StatusCodes.OK).json({
      message: "Application status updated successfully.",
      application: updated
    });
  } catch (error) {
    next(error);
  }
}

export async function getRecruiterDashboard(req, res, next) {
  try {
    const recruiter = await prisma.recruiter.findUnique({
      where: { userId: req.user.id }
    });

    const [jobsPosted, applicationsReceived, shortlisted, selected] = await Promise.all([
      prisma.company.count({ where: { recruiterId: recruiter.id } }),
      prisma.application.count({ where: { company: { recruiterId: recruiter.id } } }),
      prisma.application.count({ where: { company: { recruiterId: recruiter.id }, status: "SHORTLISTED" } }),
      prisma.application.count({ where: { company: { recruiterId: recruiter.id }, status: "SELECTED" } })
    ]);

    res.status(StatusCodes.OK).json({
      stats: {
        jobsPosted,
        applicationsReceived,
        shortlisted,
        selected
      }
    });
  } catch (error) {
    next(error);
  }
}
