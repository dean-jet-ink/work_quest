import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router } from "./routes/router";
import { dbConnect } from "./models/utils/dbconnect";
import { dotenvConfigure } from "./models/utils/dotenvConfigure";
import { cronDo } from "./models/utils/cron";

dotenvConfigure();

export const app = express();
const corsOptions = {
  credentials: true,
  origin: process.env.URL,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/", router);

// データベース接続
dbConnect();

// クーロンの実行
cronDo();
