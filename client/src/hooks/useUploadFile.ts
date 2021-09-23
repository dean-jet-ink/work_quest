import { ChangeEvent, useCallback, useState } from "react";
import AWS from "aws-sdk";
import md5 from "js-md5";

// aws S3 test
const bucket = "work-quest";
const region = "ap-northeast-3";

AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({
  params: { Bucket: bucket },
  region,
});

export const useUploadFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  // ファイルの削除
  const deleteFile = useCallback((key: "member/" | "guild/", file: string) => {
    const params = {
      Bucket: bucket,
      Key: `${key}${file}`,
    };
    s3.deleteObject(params, (err) => {
      if (err) throw err;
    });
  }, []);

  // ファイルのアップロード、および前回ファイルの削除
  const uploadFile = useCallback(
    (key: "member/" | "guild/", preFile?: string | null) => {
      const fileName = selectedFile?.name.split(".")[0];
      const extension = selectedFile?.name.split(".").splice(-1, 1);
      const hash = md5(fileName as string);
      const keyName = `${key}${hash}.${extension}`;

      if (selectedFile) {
        const params = {
          ACL: "public-read",
          Bucket: bucket,
          Body: selectedFile,
          Key: keyName,
        };
        s3.putObject(params, (err) => {
          if (err) throw err;
        });
      }

      // アップロード済みならば、以前の画像を削除
      if (preFile) {
        deleteFile(key, preFile);
      }
    },
    [selectedFile]
  );

  return { selectedFile, setSelectedFile, handleFile, uploadFile, deleteFile };
};
