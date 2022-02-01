import { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

const bucket = "work-quest";
const region = "ap-northeast-3";
const credentials = {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY!,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!,
};

const s3 = new S3Client({
  region,
  credentials,
});

type Props = {
  picture: string | null;
  key: "member" | "guild";
};

export const useFile = (props: Props) => {
  const { picture, key } = props;
  const [file, setFile] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const baseUrl = "https://work-quest.s3.ap-northeast-3.amazonaws.com/";

  useEffect(() => {
    // 画像を設定していれば、その画像を初期設定とし、無ければデフォルトの画像を設定
    if (picture) {
      setFile(`${baseUrl}${key}/${picture}`);
    } else {
      if (key === "member") {
        setFile(`${baseUrl}static/user_default.png`);
      } else {
        setFile(`${baseUrl}static/no_image.png`);
      }
    }
  }, [picture]);

  //選択画像をstateに保持
  const handleFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  // 画像の取得
  const getFile = useCallback(async (key: string): Promise<string> => {
    const fetchFile = await `${baseUrl}${key}`;
    return fetchFile;
  }, []);

  // ファイルの削除
  const deleteFile = useCallback(async (file: string) => {
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: `${key}/${file}`,
        })
      );
    } catch (err) {
      if (err) throw err;
    }
  }, []);

  // ファイルのアップロード、および前回ファイルの削除
  const uploadFile = useCallback(
    async (newFile: string | null, preFile?: string | null) => {
      try {
        if (selectedFile) {
          const keyName = `${key}/${newFile}`;

          await s3.send(
            new PutObjectCommand({
              Bucket: bucket,
              Key: keyName,
              Body: selectedFile,
              ACL: "public-read",
            })
          );

          const uploadedFile = await getFile(keyName);
          setFile(uploadedFile);
        }

        // アップロード済みならば、以前の画像を削除
        if (preFile) {
          await deleteFile(preFile);
        }
      } catch (err) {
        if (err) throw err;
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedFile]
  );

  return {
    file,
    selectedFile,
    setSelectedFile,
    handleFile,
    uploadFile,
    deleteFile,
  };
};
