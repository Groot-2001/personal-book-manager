import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { signupSchema, loginSchema } from "../validators/auth.validator";
import { asyncHandler } from "../utils/asyncHandler";
import { cookieOptions } from "../config/cookie";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const data = signupSchema.parse(req.body);

    const result = await authService.registerUser(data);

    res.cookie("token", result.token, cookieOptions);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result.user,
    });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({
        success: true,
        data: req.user,
    });
});

export const loginUser = asyncHandler(async (req, res) => {
    const data = loginSchema.parse(req.body);
  
    const result = await authService.loginUser(data);
  
    res.cookie("token", result.token, cookieOptions);
  
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result.user,
    });
  });

export const logoutUser = asyncHandler(async (_req, res) => {
    res.clearCookie("token");
  
    res.json({
      success: true,
      message: "Logged out successfully",
    });
  });