import { Request, Response } from "express";
import { db } from "../utils/dbconnect";
import { fetchChat } from "./fetchChat";

export const postChat = (req: Request, res: Response) => {
  const placeholder = {
    guild_id: req.params.id,
    user_id: req.body.userId,
    comment: req.body.comment,
    created: req.body.time,
  };

  db.query("INSERT INTO chat SET ?", placeholder, (err) => {
    if (err) throw err;
  });

  fetchChat(req, res);
};
