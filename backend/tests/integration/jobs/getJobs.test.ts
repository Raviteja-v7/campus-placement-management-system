import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { createTestJob } from "../../helpers/job.js";

describe("GET /api/jobs", () => {
  it("should return all jobs", async () => {
    const { userId } = await registerAndLoginUser({
      role: "admin",
    });

    await createTestJob(userId);

    const res = await request(app).get("/api/jobs");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
  });
});