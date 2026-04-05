import bcrypt from "bcryptjs";
import { Prisma, Role } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";
import { createToken } from "../utils/createToken.js";

function formatUserResponse(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    studentProfile: user.studentProfile,
    recruiterProfile: user.recruiterProfile
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password, role, companyName } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Name, email, password and role are required." });
    }

    if (!Object.values(Role).includes(role)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid user role." });
    }

    if (role === Role.ADMIN) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "Admin accounts cannot be self-registered." });
    }

    if (role === Role.RECRUITER && !companyName) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Company name is required for recruiters." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(StatusCodes.CONFLICT).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        studentProfile: role === Role.STUDENT ? { create: {} } : undefined,
        recruiterProfile:
          role === Role.RECRUITER
            ? {
                create: {
                  companyName
                }
              }
            : undefined
      },
      include: {
        studentProfile: true,
        recruiterProfile: true
      }
    });

    const token = createToken(user);

    res.status(StatusCodes.CREATED).json({
      message: "Registration successful.",
      token,
      user: formatUserResponse(user)
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Unable to create the user." });
    }

    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        studentProfile: true,
        recruiterProfile: true
      }
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid email or password." });
    }

    const token = createToken(user);

    res.status(StatusCodes.OK).json({
      message: "Login successful.",
      token,
      user: formatUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUser(req, res) {
  res.status(StatusCodes.OK).json({
    user: formatUserResponse(req.user)
  });
}
