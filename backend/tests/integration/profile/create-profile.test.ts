import { describe, expect, it } from "vitest";
import request from "supertest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";

describe("POST /api/profile", () => {
  it("should create a profile", async () => {
    const { cookie } = await registerAndLoginUser();

    const response = await request(app)
      .post("/api/profile")
      .set("Cookie", cookie)
      .send({
        department: "CSE",
        cgpa: 8.8,
        skills: ["Node.js", "React"],
        experience: "Twilio Intern",
        phone: "9876543210",
      });

    expect(response.status).toBe(201);
  });
});
