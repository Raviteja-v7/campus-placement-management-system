import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import Job from "../../../src/models/Job.model.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { createTestJob } from "../../helpers/job.js";

describe("DELETE /api/jobs/:id", () => {
  it("should allow admin to delete job", async () => {
    const { cookie, userId } = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(userId);

    const res = await request(app)
      .delete(`/api/jobs/${job._id}`)
      .set("Cookie", cookie);

    expect(res.status).toBe(204);

    const deleted = await Job.findById(job._id);

    expect(deleted).toBeNull();
  });

  it("should return 403 for student", async () => {
    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const student = await registerAndLoginUser();

    const job = await createTestJob(admin.userId);

    const res = await request(app)
      .delete(`/api/jobs/${job.id}`)
      .set("Cookie", student.cookie);

    expect(res.status).toBe(403);
  });

  it("should return 404 if job not found", async () => {
    const { cookie } = await registerAndLoginUser({
      role: "admin",
    });

    const res = await request(app)
      .delete("/api/jobs/507f191e810c19729de860ea")
      .set("Cookie", cookie);

    expect(res.status).toBe(404);
  });
});