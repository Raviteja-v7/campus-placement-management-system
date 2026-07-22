import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { validJobData } from "../../helpers/job.js";

describe("POST /api/jobs", () => {
  it("should allow admin to create a job", async () => {
    const { cookie } = await registerAndLoginUser({
      role: "admin",
    });

    const res = await request(app)
      .post("/api/jobs")
      .set("Cookie", cookie)
      .send(validJobData);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe(validJobData.title);
  });

  it("should return 403 for student", async () => {
    const { cookie } = await registerAndLoginUser();

    const res = await request(app)
      .post("/api/jobs")
      .set("Cookie", cookie)
      .send(validJobData);

    expect(res.status).toBe(403);
  });

  it("should return 401 if unauthenticated", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .send(validJobData);

    expect(res.status).toBe(401);
  });

  it("should validate required fields", async () => {
    const { cookie } = await registerAndLoginUser({
      role: "admin",
    });

    const res = await request(app)
      .post("/api/jobs")
      .set("Cookie", cookie)
      .send({});

    expect(res.status).toBe(400);
  });
});