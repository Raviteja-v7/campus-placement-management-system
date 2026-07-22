import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { createTestJob } from "../../helpers/job.js";

describe("PATCH /api/jobs/:id", () => {
  it("should allow admin to update job", async () => {
    const { cookie, userId } = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(userId);

    const res = await request(app)
      .patch(`/api/jobs/${job._id}`)
      .set("Cookie", cookie)
      .send({
        title: "Senior Software Engineer",
      });

    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe(
      "Senior Software Engineer"
    );
  });

  it("should return 403 for student", async () => {
    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const student = await registerAndLoginUser();

    const job = await createTestJob(admin.userId);

    const res = await request(app)
      .patch(`/api/jobs/${job._id}`)
      .set("Cookie", student.cookie)
      .send({
        title: "Updated",
      });

    expect(res.status).toBe(403);
  });

  it("should return 404 if job not found", async () => {
    const { cookie } = await registerAndLoginUser({
      role: "admin",
    });

    const res = await request(app)
      .patch("/api/jobs/507f191e810c19729de860ea")
      .set("Cookie", cookie)
      .send({
        title: "Updated",
      });

    expect(res.status).toBe(404);
  });
});