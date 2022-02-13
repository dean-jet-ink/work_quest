import { Request, Response } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

import { s3Utils } from "../utils/awsConfigure";

const { s3, bucket } = s3Utils();

export const uploadFile = async (req: Request, res: Response) => {
  const keyName: string = req.body.keyName;
  const file = fs.readFileSync(req.file!.path); //tmpフォルダの一時データを読み込み

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: keyName,
        Body: file,
        ACL: "public-read",
      })
    );
  } catch (err) {
    res.end();
    throw err;
  }

  res.end();
};
