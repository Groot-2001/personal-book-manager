import jwt from "jsonwebtoken";
import { env } from "../config/env";

const JWT_EXPIRES_IN = "7d";

export const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    env.JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as {
    userId: string;
  };
};