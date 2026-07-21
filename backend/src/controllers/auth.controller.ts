import type { RequestHandler } from "express";

import { register } from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser: RequestHandler = asyncHandler(
  async (req, res) => {
    const user = await register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  },
);