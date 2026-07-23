import {
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

import s3 from "../config/s3.js";

export const uploadToS3 = async (
  file: Express.Multer.File,
  folder: string
) => {
  const extension = file.originalname.split(".").pop();

  const key = `${folder}/${randomUUID()}.${extension}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  return key;
};

export const getSignedS3Url = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  });

  return getSignedUrl(s3, command, {
    expiresIn: 60 * 60, // 1 hour
  });
};