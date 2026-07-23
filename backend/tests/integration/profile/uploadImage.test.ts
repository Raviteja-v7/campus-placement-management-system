import {
  mockedS3Key,
  uploadToS3Mock,
} from "../../helpers/mocks.js";

import request from "supertest";
import { afterEach, describe, expect, it, vi } from "vitest";

import app from "../../../src/app.js";
import { registerAndLoginUser } from "../../helpers/auth.js";
import { StudentProfile } from "../../../src/models/StudentProfile.model.js";

import { createProfile } from "../../helpers/profile.js";
import { avatarPath, resumePath } from "../../helpers/files.js";


afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/profile/me/image", () => {
  it("should upload profile image", async () => {
    const { cookie, userId } = await registerAndLoginUser();

    await createProfile(cookie);

    const res = await request(app)
      .post("/api/profile/me/image")
      .set("Cookie", cookie)
      .attach("image", avatarPath);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    expect(res.body.data).toEqual(
      expect.objectContaining({
        avatarUrl: mockedS3Key,
      })
    );

    const profile = await StudentProfile.findOne({ userId });

    expect(profile).not.toBeNull();
    expect(profile?.avatarUrl).toBe(mockedS3Key);

    expect(uploadToS3Mock).toHaveBeenCalledTimes(1);
    expect(uploadToS3Mock).toHaveBeenCalledWith(
      expect.any(Object),
      "profile-images"
    );
  });

    it("should return 401 if unauthenticated", async () => {
    const res = await request(app)
        .post("/api/profile/me/image");

    expect(res.status).toBe(401);
    });

  it("should return 404 if profile does not exist", async () => {
    const { cookie } = await registerAndLoginUser();

    const res = await request(app)
      .post("/api/profile/me/image")
      .set("Cookie", cookie)
      .attach("image", avatarPath);

    expect(res.status).toBe(404);
  });

  it("should return 400 if no file is uploaded", async () => {
    const { cookie } = await registerAndLoginUser();

    await createProfile(cookie);

    const res = await request(app)
      .post("/api/profile/me/image")
      .set("Cookie", cookie);

    expect(res.status).toBe(400);
  });

  it("should return 400 for invalid image type", async () => {
    const { cookie } = await registerAndLoginUser();

    await createProfile(cookie);

    const res = await request(app)
      .post("/api/profile/me/image")
      .set("Cookie", cookie)
      .attach("image", resumePath);

    expect(res.status).toBe(400);
  });
});