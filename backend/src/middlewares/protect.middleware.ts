import type { RequestHandler } from "express";

import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

export const protect: RequestHandler = asyncHandler(async (req, _res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  const payload = verifyToken(token);

  const user = await User.findById(payload.userId);

  if (!user) {
    throw new ApiError(401, "User no longer exists");
  }

  req.user = {
    id: user.id,
    role: user.role,
  };

  next();
});