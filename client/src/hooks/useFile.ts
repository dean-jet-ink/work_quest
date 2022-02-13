import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { axios } from "../apis/axios";

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
    const preKeyName = `${key}/${file}`;

    try {
      await axios.delete("/delete/file", { data: { preKeyName } });
    } catch (err) {
      throw err;
    }
  }, []);

  // ファイルのアップロード、および前回ファイルの削除
  const uploadFile = useCallback(
    async (newFile: string | null, preFile?: string | null) => {
      try {
        if (selectedFile) {
          const keyName = `${key}/${newFile}`;
          const data = new FormData(); //multipart/form-dataのため、FormData使用
          data.append("keyName", keyName); //type/textのformデータも取り扱える
          data.append("file", selectedFile);
          const headers = { "content-type": "multipart/form-data" };

          await axios.post("/post/file", data, { headers });

          const uploadedFile = await getFile(keyName);
          setFile(uploadedFile);
        }

        // 以前の画像があれば削除
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
