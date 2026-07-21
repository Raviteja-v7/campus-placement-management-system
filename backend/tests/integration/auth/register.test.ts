import { describe, expect, it } from "vitest";
import request from "supertest";

import app from "../../../src/app.js";
import { User } from "../../../src/models/User.model.js";

describe("POST /api/auth/register", () => {
  const validPayload = {
    username: "john",
    email: "john@example.com",
    password: "Password123",
  };

  it("should create a new user", async () => {
    // Act
    const response = await request(app).post("/api/auth/register").send(validPayload);

    // Assert - HTTP
    expect(response.status).toBe(201);

    // Assert - Response
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(validPayload.email);
    expect(response.body.data.username).toBe(validPayload.username);
    expect(response.body.data.password).toBeUndefined();

    // Assert - Database
    const user = await User.findOne({
      email: validPayload.email,
    }).select("+password");

    expect(user).not.toBeNull();
    expect(user?.email).toBe(validPayload.email);
    expect(user?.username).toBe(validPayload.username);

    // Password should be hashed
    expect(user?.password).not.toBe(validPayload.password);
  });

  it("should reject duplicate email", async () => {
    await request(app).post("/api/auth/register").send(validPayload);

    const response = await request(app).post("/api/auth/register").send({
      username: "another-user",
      email: validPayload.email,
      password: "Password123",
    });

    expect(response.status).toBe(409);
  });

  it("should reject duplicate username", async () => {
    await request(app).post("/api/auth/register").send(validPayload);

    const response = await request(app).post("/api/auth/register").send({
      username: validPayload.username,
      email: "another@example.com",
      password: "Password123",
    });

    expect(response.status).toBe(409);
  });

  it("should reject invalid email", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "john",
      email: "invalid-email",
      password: "Password123",
    });

    expect(response.status).toBe(400);
  });

  it("should reject missing password", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "john",
      email: "john@example.com",
      password: "",
    });

    expect(response.status).toBe(400);
  });
});
