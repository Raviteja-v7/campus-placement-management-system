import type { RequestHandler } from "express";

import { register, login } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";

export const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const user = await register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const { token, user } = await login(req.body);

  res
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false, // we'll improve this later
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      data: user,
    });
});

export const getMe: RequestHandler = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user!.id);

  res.json({
    success: true,
    data: user,
  });
});

export const logoutUser: RequestHandler = asyncHandler(async (_req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
