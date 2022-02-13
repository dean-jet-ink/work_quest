import { S3Client } from "@aws-sdk/client-s3";

import { dotenvConfigure } from "./dotenvConfigure";

dotenvConfigure();

const region = "ap-northeast-3";
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
};

export const s3Utils = () => {
  const s3 = new S3Client({
    region,
    credentials,
  });

  const bucket = "work-quest";

  return { s3, bucket };
};
