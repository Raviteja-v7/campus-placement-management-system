import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";

describe("GET /api/profile", () => {
  it("should allow admin to view all profiles", async () => {
    const admin = await registerAndLoginUser({ role: "admin" });

    const student1 = await registerAndLoginUser();
    const student2 = await registerAndLoginUser();

    await request(app)
      .post("/api/profile/me")
      .set("Cookie", student1.cookie)
      .send({
        department: "CSE",
        cgpa: 8.8,
        skills: ["Node.js", "React"],
        experience: "Twilio Intern",
        phone: "9876543210",
      });

    await request(app)
      .post("/api/profile/me")
      .set("Cookie", student2.cookie)
      .send({
        department: "CSE",
        cgpa: 8.8,
        skills: ["Node.js", "React"],
        experience: "Twilio Intern",
        phone: "9876543210",
      });

    const res = await request(app)
      .get("/api/profile")
      .set("Cookie", admin.cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(2);
  });

  it("should return 403 for student", async () => {
    const student = await registerAndLoginUser();

    const res = await request(app)
      .get("/api/profile")
      .set("Cookie", student.cookie);

    expect(res.status).toBe(403);
  });

  it("should return 401 if unauthenticated", async () => {
    const res = await request(app).get("/api/profile");

    expect(res.status).toBe(401);
  });
});