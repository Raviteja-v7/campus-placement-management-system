import { ROLES } from "../constants/roles.js";

export interface AuthenticatedUser {
  id: string;
  role: (typeof ROLES)[keyof typeof ROLES];
}