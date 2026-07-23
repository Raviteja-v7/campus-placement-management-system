import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { createTestJob } from "../../helpers/job.js";

describe("POST /api/applications", () => {
  it("should allow a student to apply for a job", async () => {
    const student = await registerAndLoginUser();

    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(admin.userId);

    const res = await request(app)
      .post("/api/applications")
      .set("Cookie", student.cookie)
      .send({
        jobId: job._id.toString(),
      });

    expect(res.status).toBe(201);
  });


  it("should return 409 if the student has already applied for the job", async () => {
  const student = await registerAndLoginUser();

  const admin = await registerAndLoginUser({
    role: "admin",
  });

  const job = await createTestJob(admin.userId);

  await request(app)
    .post("/api/applications")
    .set("Cookie", student.cookie)
    .send({
      jobId: job._id.toString(),
    });

  const res = await request(app)
    .post("/api/applications")
    .set("Cookie", student.cookie)
    .send({
      jobId: job._id.toString(),
    });

  expect(res.status).toBe(409);
});


it("should return 404 if the job does not exist", async () => {
  const student = await registerAndLoginUser();

  const res = await request(app)
    .post("/api/applications")
    .set("Cookie", student.cookie)
    .send({
      jobId: "507f191e810c19729de860ea",
    });

  expect(res.status).toBe(404);
});

it("should return 400 if the application deadline has passed", async () => {
  const student = await registerAndLoginUser();

  const admin = await registerAndLoginUser({
    role: "admin",
  });

  const job = await createTestJob(admin.userId);

  // Make the job expired
  job.deadline = new Date(Date.now() - 60 * 1000);
  await job.save();

  const res = await request(app)
    .post("/api/applications")
    .set("Cookie", student.cookie)
    .send({
      jobId: job._id.toString(),
    });

  expect(res.status).toBe(400);
});

it("should return 401 if unauthenticated", async () => {
  const admin = await registerAndLoginUser({
    role: "admin",
  });

  const job = await createTestJob(admin.userId);

  const res = await request(app)
    .post("/api/applications")
    .send({
      jobId: job._id.toString(),
    });

  expect(res.status).toBe(401);
});


it("should return 403 if admin tries to apply", async () => {
  const admin = await registerAndLoginUser({
    role: "admin",
  });

  const job = await createTestJob(admin.userId);

  const res = await request(app)
    .post("/api/applications")
    .set("Cookie", admin.cookie)
    .send({
      jobId: job._id.toString(),
    });

  expect(res.status).toBe(403);
});


it("should validate required fields", async () => {
  const student = await registerAndLoginUser();

  const res = await request(app)
    .post("/api/applications")
    .set("Cookie", student.cookie)
    .send({});

  expect(res.status).toBe(400);
});
});