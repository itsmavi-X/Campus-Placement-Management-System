import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

export async function getStudents(req, res, next) {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        _count: {
          select: {
            applications: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({ students });
  } catch (error) {
    next(error);
  }
}

export async function getRecruiters(req, res, next) {
  try {
    const recruiters = await prisma.recruiter.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        _count: {
          select: {
            jobs: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({ recruiters });
  } catch (error) {
    next(error);
  }
}

export async function getAdminDashboard(req, res, next) {
  try {
    const [
      totalStudents,
      totalRecruiters,
      totalJobs,
      totalApplications,
      shortlisted,
      selected,
      recentApplications
    ] = await Promise.all([
      prisma.student.count(),
      prisma.recruiter.count(),
      prisma.company.count(),
      prisma.application.count(),
      prisma.application.count({ where: { status: "SHORTLISTED" } }),
      prisma.application.count({ where: { status: "SELECTED" } }),
      prisma.application.findMany({
        take: 5,
        orderBy: { appliedAt: "desc" },
        include: {
          student: {
            include: {
              user: {
                select: {
                  name: true
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
      })
    ]);

    res.status(StatusCodes.OK).json({
      stats: {
        totalStudents,
        totalRecruiters,
        totalJobs,
        totalApplications,
        shortlisted,
        selected
      },
      recentApplications
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllApplications(req, res, next) {
  try {
    const applications = await prisma.application.findMany({
      orderBy: { appliedAt: "desc" },
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
            role: true,
            location: true
          }
        }
      }
    });

    res.status(StatusCodes.OK).json({ applications });
  } catch (error) {
    next(error);
  }
}
