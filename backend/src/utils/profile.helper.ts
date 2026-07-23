import { getSignedS3Url } from "./uploadToS3.js";

export const attachSignedUrls = async (profile: any) => {
  const profileObj = profile.toObject();

  if (profileObj.avatarUrl) {
    profileObj.avatarUrl = await getSignedS3Url(profileObj.avatarUrl);
  }

  if (profileObj.resumeUrl) {
    profileObj.resumeUrl = await getSignedS3Url(profileObj.resumeUrl);
  }

  return profileObj;
};