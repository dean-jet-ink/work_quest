import { Request, Response } from "express";
import { db } from "../dbconnect";

export const deleteGuildMember = (req: Request, res: Response) => {
  const placeholder = [
    { guild_id: req.body.guildId },
    { user_id: req.body.userId },
  ];

  db.query(
    "DELETE FROM guild_members WHERE ? AND ?",
    placeholder,
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
};
