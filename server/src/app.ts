import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { router } from "./routes/router";
import { dbConnect } from "./models/utils/dbconnect";

dotenv.config();

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
