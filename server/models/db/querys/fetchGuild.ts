import { Request, Response } from "express";
import { db } from "../dbconnect";

export const fetchGuild = (req: Request, res: Response) => {
  db.query(
    "SELECT * FROM guilds WHERE guild_id = ?",
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
