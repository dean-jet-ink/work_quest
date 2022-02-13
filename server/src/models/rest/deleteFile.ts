import { Request, Response } from "express";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import { s3Utils } from "../utils/awsConfigure";

const { s3, bucket } = s3Utils();

export const deleteFile = async (req: Request, res: Response) => {
  const preKeyName: string = req.body.preKeyName;

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: preKeyName,
      })
    );
  } catch (err) {
    res.end();
    throw err;
  }

  res.end();
};
