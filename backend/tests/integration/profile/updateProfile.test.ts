import { describe, expect, it } from "vitest";
import request from "supertest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";

describe("PATCH /api/profile/me", () => {
  it("should update the profile", async () => {
    const { cookie } = await registerAndLoginUser();

    await request(app)
      .post("/api/profile/me")
      .set("Cookie", cookie)
      .send({
        department: "CSE",
        cgpa: 8.5,
        skills: ["Node.js"],
        experience: "Intern",
        phone: "9999999999",
      });

    const response = await request(app)
      .patch("/api/profile/me")
      .set("Cookie", cookie)
      .send({
        cgpa: 9.2,
        skills: ["Node.js", "React"],
      });

    expect(response.status).toBe(200);
    expect(response.body.data.cgpa).toBe(9.2);
    expect(response.body.data.skills).toEqual(["Node.js", "React"]);
  });

  it("should return 401 if user is not authenticated", async () => {
    const response = await request(app).patch("/api/profile/me").send({
      cgpa: 9.0,
    });

    expect(response.status).toBe(401);
  });

  it("should return 404 if profile does not exist", async () => {
    const { cookie } = await registerAndLoginUser();

    const response = await request(app).patch("/api/profile/me").set("Cookie", cookie).send({
      cgpa: 9.0,
    });

    expect(response.status).toBe(404);
  });
});
