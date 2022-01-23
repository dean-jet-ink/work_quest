import fs from "fs";
import { db } from "../../models/utils/dbconnect";

export const resetDB = async () => {
  await db.query("DROP DATABASE IF EXISTS test_db");
  await db.query("CREATE DATABASE test_db");
  await db.query("USE test_db");
  const seedFile = fs.readFileSync(
    "./src/__tests__/testUtils/test.dmp",
    "utf8"
  );
  const dumpFile = seedFile.replace(/\r?\n/g, "");
  const querys = dumpFile.split(";");
  //最後のインデックスに""が値として格納されるので、それを削除
  querys.pop();

  for (const query of querys) {
    await new Promise<void>((resolve) => {
      db.query(query).on("result", resolve);
    });
  }
};
