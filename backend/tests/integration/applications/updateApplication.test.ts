import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { createTestJob } from "../../helpers/job.js";
import Application from "../../../src/models/Application.model.js";

describe("PATCH /api/applications/:id", () => {
  it("should allow admin to update application status", async () => {
    const student = await registerAndLoginUser();

    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(admin.userId);

    const application = await Application.create({
      student: student.userId,
      job: job._id,
    });

    const res = await request(app)
      .patch(`/api/applications/${application._id}`)
      .set("Cookie", admin.cookie)
      .send({
        status: "shortlisted",
      });

    expect(res.status).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.data.status).toBe("shortlisted");
  });


    it("should return 403 if student updates application", async () => {
    const student = await registerAndLoginUser();

    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(admin.userId);

    const application = await Application.create({
      student: student.userId,
      job: job._id,
    });

    const res = await request(app)
      .patch(`/api/applications/${application._id}`)
      .set("Cookie", student.cookie)
      .send({
        status: "shortlisted",
      });

    expect(res.status).toBe(403);
  });


    it("should return 404 if application does not exist", async () => {
    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const res = await request(app)
      .patch("/api/applications/507f191e810c19729de860ea")
      .set("Cookie", admin.cookie)
      .send({
        status: "shortlisted",
      });

    expect(res.status).toBe(404);
  });


    it("should validate status", async () => {
    const student = await registerAndLoginUser();

    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(admin.userId);

    const application = await Application.create({
      student: student.userId,
      job: job._id,
    });

    const res = await request(app)
      .patch(`/api/applications/${application._id}`)
      .set("Cookie", admin.cookie)
      .send({
        status: "abc",
      });

    expect(res.status).toBe(400);
  });
});