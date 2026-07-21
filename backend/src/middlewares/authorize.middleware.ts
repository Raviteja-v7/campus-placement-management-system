import type { RequestHandler } from "express";

import { ApiError } from "../utils/ApiError.js";
import type { Role } from "../constants/roles.js";

export const authorize =
  (...roles: Role[]): RequestHandler =>
  (req, _res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Access denied");
    }

    next();
  };