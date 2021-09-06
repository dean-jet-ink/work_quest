/// <reference types="react-scripts" />

// mp3ファイルをimportするための設定
declare module "*.mp3" {
  const src: string;
  export default src;
}

// フォントファイルをimportするための設定
declare module "*.ttf" {
  const src: any;
  export default src;
}
