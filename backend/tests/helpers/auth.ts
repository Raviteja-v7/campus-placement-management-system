import request from "supertest";
import app from "../../src/app.js";
import { faker } from "@faker-js/faker";

export const registerAndLoginUser = async () => {
  const user = {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: "Password@123",
    role: "student",
  };

  // Ignore if user already existsa
  await request(app).post("/api/auth/register").send(user);

  const loginResponse = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });

  return {
    cookie: loginResponse.headers["set-cookie"],
    user,
    userId: loginResponse.body.data.id,
  };
};
