export const generateFileNameWithHash = (file: File): string => {
  const len = 16; //ハッシュ値の長さ
  const char = "abcdefghijklmnopqrstuvwxyz0123456789"; //含める文字列
  const charLen = char.length; //含める文字列の長さ
  let hash = "";
  for (let i = 0; i < len; i++) {
    hash += char[Math.floor(Math.random() * charLen)];
  }

  const fileName = file.name.split(".")[0];
  const extension = file.name.split(".").splice(-1, 1);
  const newFileName = `${fileName}.${hash}.${extension}`;
  return newFileName;
};
