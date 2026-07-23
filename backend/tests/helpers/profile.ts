import request from "supertest";

import app from "../../src/app.js";

export const validProfileData = {
  department: "CSE",
  cgpa: 8.8,
  skills: ["Node.js", "React"],
  experience: "Twilio Intern",
  phone: "9876543210",
};

export const createProfile = async (cookie: string) => {
  return request(app)
    .post("/api/profile/me")
    .set("Cookie", cookie)
    .send(validProfileData);
};