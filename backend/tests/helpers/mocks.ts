import { vi } from "vitest";

export const mockedS3Key = "profile-images/test-avatar.png";

export const uploadToS3Mock = vi.fn().mockResolvedValue(mockedS3Key);

vi.mock("../../src/utils/uploadToS3.js", () => ({
  uploadToS3: uploadToS3Mock,
}));