import { Request, Response } from "express";
import { db } from "../dbconnect";

export const fetchGuildList = (req: Request, res: Response) => {
  db.query("SELECT * FROM guilds", (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
