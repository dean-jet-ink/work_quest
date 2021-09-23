import { useCallback } from "react";
import md5 from "js-md5";

export const useFileStringify = () => {
  // File型の値を、ハッシュ化した文字列のファイル名に変換
  const fileToString = useCallback((picture: File): string => {
    const fileName = picture.name.split(".")[0];
    const hash = md5(fileName as string);
    const extension = picture.name.split(".").splice(-1, 1);
    return `${hash}.${extension}`;
  }, []);

  return { fileToString };
};
