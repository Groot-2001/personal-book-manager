import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      user?: typeof User.prototype;
    }
  }
}

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ApiError(401, "Authentication required"));
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
    };

    const user = await User.findById(payload.userId).select("-password");

    if (!user) {
      return next(new ApiError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};