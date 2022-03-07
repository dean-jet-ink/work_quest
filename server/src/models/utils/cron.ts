import cron from "node-cron";
import { db } from "./dbconnect";

export const cronDo = () => {
  cron.schedule("0 0 0 * * 1", () => {
    db.query(
      "UPDATE reports SET monday = 0, tuesday = 0, wednesday = 0, thursday = 0, friday = 0, saturday = 0, sunday = 0"
    );
    console.log("月曜日:00:00:00 reports初期化");
  });
};
