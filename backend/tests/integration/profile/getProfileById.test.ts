import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { StudentProfile } from "../../../src/models/StudentProfile.model.js";

describe("GET /api/profile/:id", () => {
  it("should allow admin to view a profile by id", async () => {
    const admin = await registerAndLoginUser({ role: "admin" });

    const student = await registerAndLoginUser();

    await request(app)
      .post("/api/profile/me")
      .set("Cookie", student.cookie)
      .send({
        department: "CSE",
        cgpa: 8.8,
        skills: ["Node.js", "React"],
        experience: "Twilio Intern",
        phone: "9876543210",
      });


    const profile = await StudentProfile.findOne({
      userId: student.userId,
    });

    const res = await request(app)
      .get(`/api/profile/${profile!._id}`)
      .set("Cookie", admin.cookie);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data._id).toBe(profile!._id.toString());
  });

    it("should return 404 if profile does not exist", async () => {
    const admin = await registerAndLoginUser({
      role: "admin",
    });

    const res = await request(app)
      .get("/api/profile/507f191e810c19729de860ea")
      .set("Cookie", admin.cookie);

    expect(res.status).toBe(404);
  });

    it("should return 403 for student", async () => {
    const student = await registerAndLoginUser();

    const res = await request(app)
      .get("/api/profile/507f191e810c19729de860ea")
      .set("Cookie", student.cookie);

    expect(res.status).toBe(403);
  });

    it("should return 401 if unauthenticated", async () => {
    const res = await request(app)
      .get("/api/profile/507f191e810c19729de860ea");

    expect(res.status).toBe(401);
  });
});