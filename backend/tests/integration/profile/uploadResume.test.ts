import "../../helpers/mocks.js";

import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";

import app from "../../../src/app.js";
import { StudentProfile } from "../../../src/models/StudentProfile.model.js";

import { registerAndLoginUser } from "../../helpers/auth.js";
import { createProfile } from "../../helpers/profile.js";
import { avatarPath, resumePath } from "../../helpers/files.js";
import { mockedS3Key, uploadToS3Mock } from "../../helpers/mocks.js";

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/profile/me/resume", () => {
    it("should upload resume", async () => {
  const { cookie } = await registerAndLoginUser();

  await createProfile(cookie);

  const res = await request(app)
    .post("/api/profile/me/resume")
    .set("Cookie", cookie)
    .attach("resume", resumePath);

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);

  expect(uploadToS3Mock).toHaveBeenCalledTimes(1);

  const profile = await StudentProfile.findOne({
    userId: res.body.data.userId,
  });

  expect(profile?.resumeUrl).toBe(mockedS3Key);
});

it("should return 401 if unauthenticated", async () => {
  const res = await request(app)
    .post("/api/profile/me/resume");

  expect(res.status).toBe(401);
});

it("should return 404 if profile does not exist", async () => {
  const { cookie } = await registerAndLoginUser();

  const res = await request(app)
    .post("/api/profile/me/resume")
    .set("Cookie", cookie)
    .attach("resume", resumePath);

  expect(res.status).toBe(404);
});

it("should return 400 if no file is uploaded", async () => {
  const { cookie } = await registerAndLoginUser();

  await createProfile(cookie);

  const res = await request(app)
    .post("/api/profile/me/resume")
    .set("Cookie", cookie);

  expect(res.status).toBe(400);
});

it("should return 400 for invalid resume type", async () => {
  const { cookie } = await registerAndLoginUser();

  await createProfile(cookie);

  const res = await request(app)
    .post("/api/profile/me/resume")
    .set("Cookie", cookie)
    .attach("resume", avatarPath);

  expect(res.status).toBe(400);
});

});