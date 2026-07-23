import request from "supertest";
import { describe, expect, it } from "vitest";


import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { createTestJob } from "../../helpers/job.js";


describe("GET /api/applications", () => {
  it("should return only the logged in student's applications", async () => {
    // Arrange
    const student1 = await registerAndLoginUser();
    const student2 = await registerAndLoginUser();

    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(admin.userId);

    await request(app)
      .post("/api/applications")
      .set("Cookie", student1.cookie)
      .send({
        jobId: job._id.toString(),
      });

    await request(app)
      .post("/api/applications")
      .set("Cookie", student2.cookie)
      .send({
        jobId: job._id.toString(),
      });

    // Act
    const res = await request(app)
      .get("/api/applications")
      .set("Cookie", student1.cookie);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.data).toHaveLength(1);

    expect(res.body.data[0].student.toString()).toBe(student1.userId);
  });

    it("should allow admin to view all applications", async () => {
    const student1 = await registerAndLoginUser();

    const student2 = await registerAndLoginUser();

    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const job = await createTestJob(admin.userId);

    await request(app)
      .post("/api/applications")
      .set("Cookie", student1.cookie)
      .send({
        jobId: job._id.toString(),
      });

    await request(app)
      .post("/api/applications")
      .set("Cookie", student2.cookie)
      .send({
        jobId: job._id.toString(),
      });

    const res = await request(app)
      .get("/api/applications")
      .set("Cookie", admin.cookie);

    expect(res.status).toBe(200);

    expect(res.body.success).toBe(true);

    expect(res.body.data).toHaveLength(2);
  });

    it("should return 401 if unauthenticated", async () => {
    const res = await request(app).get("/api/applications");

    expect(res.status).toBe(401);
  });
});