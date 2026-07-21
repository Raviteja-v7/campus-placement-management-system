import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import type { Role } from "../constants/roles.js";

interface JwtPayload {
  userId: string;
  role: Role;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};
