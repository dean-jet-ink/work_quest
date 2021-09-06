import mysql from "mysql";

// データベース定義
export const db = mysql.createConnection({
  host: "db",
  user: "kenta",
  password: "nre50678",
  port: 3306,
  database: "work_quest",
});

// データベース接続
export const dbConnect = () => {
  db.connect((err) => {
    if (err) {
      console.log(`DB接続失敗: ${err}`);
    } else {
      console.log("DB接続成功");
    }
  });
};

export const dbDisconnect = () => {
  db.end((err) => {
    if (err) {
      console.log(`DB切断失敗: ${err}`);
    } else {
      console.log("DB切断成功");
    }
  });
};
