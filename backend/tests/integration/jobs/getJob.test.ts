import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { createTestJob } from "../../helpers/job.js";

describe("GET /api/jobs/:id", () => {
  it("should return job by id", async () => {
    const { userId } = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(userId);

    const res = await request(app).get(`/api/jobs/${job._id}`);
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(job._id.toString());
  });

  it("should return 404 if job does not exist", async () => {
    const res = await request(app).get(
      "/api/jobs/507f191e810c19729de860ea"
    );

    expect(res.status).toBe(404);
  });
});