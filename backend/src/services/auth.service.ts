import { User } from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import type { RegisterInput } from "../validators/auth.validator.js";

export const register = async (payload: RegisterInput) => {
  const { username, email, password } = payload;

  const existingEmail = await User.findOne({ email });
    if (existingEmail) {
    throw new ApiError(409, "Email is already registered");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
    throw new ApiError(409, "Username is already taken");
    }

  const user = await User.create({
    username,
    email,
    password,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
};