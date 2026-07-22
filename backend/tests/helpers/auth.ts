import request from "supertest";
import { expect } from "vitest";
import { faker } from "@faker-js/faker";

import app from "../../src/app.js";
import type { Role } from "../../src/constants/roles.js";
import { User } from "../../src/models/User.model.js";

type RegisterAndLoginOptions = {
  role?: Role;
};

const DEFAULT_PASSWORD = "Password@123";

export const registerAndLoginUser = async (
  { role = "student" }: RegisterAndLoginOptions = {}
) => {
  const user = {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: DEFAULT_PASSWORD,
    role,
  };

  const registerResponse = await request(app)
  .post("/api/auth/register")
  .send(user);

expect(registerResponse.status).toBe(201);

// Promote to admin only in tests
if (role === "admin") {
  await User.findByIdAndUpdate(registerResponse.body.data.id, {
    role: "admin",
  });
}

const loginResponse = await request(app)
  .post("/api/auth/login")
  .send({
    email: user.email,
    password: user.password,
  });

expect(loginResponse.status).toBe(200);

  return {
    cookie: loginResponse.headers["set-cookie"],
    user,
    userId: loginResponse.body.data.id,
  };
};