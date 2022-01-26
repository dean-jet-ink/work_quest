import { createConnection } from "mysql";
import dotenv from "dotenv";

dotenv.config();

// データベース定義
export const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
});

// データベース接続
export const dbConnect = async () => {
  await db.connect((err) => {
    if (err) {
      console.log(`DB接続失敗: ${err}`);
    } else {
      console.log("DB接続成功");
    }
  });
};

// データベース切断
export const dbDisconnect = async () => {
  await db.end((err) => {
    if (err) {
      console.log(`DB切断失敗: ${err}`);
    } else {
      console.log("DB切断成功");
    }
  });
};
