import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { RegisterInput } from "../validators/auth.validator.js";
import type { LoginInput } from "../validators/auth.validator.js";
import { generateToken } from "../utils/jwt.js";

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

export const login = async (payload: LoginInput) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};