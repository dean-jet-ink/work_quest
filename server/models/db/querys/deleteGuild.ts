import { Request, Response } from "express";
import { db } from "../dbconnect";

export const deleteGuild = (req: Request, res: Response) => {
  const placeholder = { guild_id: req.body.guildId };
  db.query("DELETE FROM guilds WHERE ?", placeholder, (err) => {
    if (err) throw err;
  });
  db.query("DELETE FROM guild_members WHERE ?", placeholder, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};
