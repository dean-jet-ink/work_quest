import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router } from "./routes/router";
import { dbConnect } from "./models/db/dbconnect";

const app = express();
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/", router);

// データベース接続
dbConnect();

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`port: ${port}`);
});
