import { describe, expect, it } from "vitest";
import request from "supertest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";

describe("GET /api/profile/me", () => {
  it("should return the authenticated user's profile", async () => {
    const { cookie } = await registerAndLoginUser();

    await request(app)
      .post("/api/profile")
      .set("Cookie", cookie)
      .send({
        department: "CSE",
        cgpa: 8.5,
        skills: ["Node.js"],
        experience: "Intern",
        phone: "9999999999",
      });

    const response = await request(app)
      .get("/api/profile/me")
      .set("Cookie", cookie);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.department).toBe("CSE");
  });

  it("should return 401 if user is not authenticated", async () => {
    const response = await request(app).get("/api/profile/me");

    expect(response.status).toBe(401);
  });

  it("should return 404 if profile does not exist", async () => {
    const { cookie } = await registerAndLoginUser();

    const response = await request(app)
      .get("/api/profile/me")
      .set("Cookie", cookie);

    expect(response.status).toBe(404);
  });
});