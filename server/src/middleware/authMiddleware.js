import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authentication required." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        studentProfile: true,
        recruiterProfile: true
      }
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (_error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Session expired or invalid token." });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: "You do not have access to this resource." });
    }

    next();
  };
}
