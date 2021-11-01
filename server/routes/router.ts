import { Router, json, urlencoded } from "express";
import { auth } from "../models/auth";
import { completedSmallGoal } from "../models/db/querys/completedSmallGoal";
import { completedWork } from "../models/db/querys/completedWork";
import { deleteCheer } from "../models/db/querys/deleteCheer";
import { deleteGuild } from "../models/db/querys/deleteGuild";
import { deleteGuildMember } from "../models/db/querys/deleteGuildMember";
import { deleteSmallGoal } from "../models/db/querys/deleteSmallGoal";
import { deleteWork } from "../models/db/querys/deleteWork";
import { fetchChat } from "../models/db/querys/fetchChat";
import { fetchCheer } from "../models/db/querys/fetchCheer";
import { fetchCheered } from "../models/db/querys/fetchCheered";
import { fetchGuild } from "../models/db/querys/fetchGuild";
import { fetchGuildList } from "../models/db/querys/fetchGuildList";
import { fetchGuildMembers } from "../models/db/querys/fetchGuildMembers";
import { fetchMyGuild } from "../models/db/querys/fetchMyGuild";
import { fetchReport } from "../models/db/querys/fetchReport";
import { fetchSmallGoalOnBattle } from "../models/db/querys/fetchSmallGoalOnBattle";
import { fetchSmallGoals } from "../models/db/querys/fetchSmallGoals";
import { fetchUser } from "../models/db/querys/fetchUser";
import { fetchUserList } from "../models/db/querys/fetchUserList";
import { fetchWorks } from "../models/db/querys/fetchWorks";
import { postChat } from "../models/db/querys/postChat";
import { postCheer } from "../models/db/querys/postCheer";
import { postGuild } from "../models/db/querys/postGuild";
import { postGuildMember } from "../models/db/querys/postGuildMember";
import { postSmallGoal } from "../models/db/querys/postSmallGoal";
import { postWork } from "../models/db/querys/postWork";
import { setCookie } from "../models/db/querys/setCookie";
import { signup } from "../models/db/querys/signup";
import { updateLevel } from "../models/db/querys/updateLevel";
import { updateProfile } from "../models/db/querys/updateProfile";
import { updateReport } from "../models/db/querys/updateReport";
import { updateTitle } from "../models/db/querys/updateTitle";
import { updateTotalTime } from "../models/db/querys/updateTotalTime";
import { validateDuplicatedMail } from "../models/db/querys/validateDuplicatedMail";
import { logout } from "../models/logout";

export const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router
  .get("/get", (req, res) => {
    res.send("getページ");
  })
  .get("/get/validation/mail/duplicated/:mail", (req, res) => {
    validateDuplicatedMail(req, res);
  })
  .get("/logout", (req, res) => {
    logout(res);
  })
  .get("/auth", (req, res) => {
    auth(req, res);
  })
  .get("/fetch/user/:id", (req, res) => {
    fetchUser(req, res);
  })
  .get("/fetch/userlist/:limit", (req, res) => {
    fetchUserList(req, res);
  })
  .get("/fetch/works/:id", (req, res) => {
    fetchWorks(req, res);
  })
  .get("/fetch/smallgoals/:id", (req, res) => {
    fetchSmallGoals(req, res);
  })
  .get("/fetch/smallgoal/battle/:id", (req, res) => {
    fetchSmallGoalOnBattle(req, res);
  })
  .get("/fetch/guildlist", (req, res) => {
    fetchGuildList(req, res);
  })
  .get("/fetch/myguild/:id", (req, res) => {
    fetchMyGuild(req, res);
  })
  .get("/fetch/guild/:id", (req, res) => {
    fetchGuild(req, res);
  })
  .get("/fetch/guild/members/:id", (req, res) => {
    fetchGuildMembers(req, res);
  })
  .get("/fetch/chat/:id", (req, res) => {
    fetchChat(req, res);
  })
  .get("/fetch/report/:id", (req, res) => {
    fetchReport(req, res);
  })
  .get("/fetch/cheer/:id", (req, res) => {
    fetchCheer(req, res);
  })
  .get("/fetch/cheered/:id", (req, res) => {
    fetchCheered(req, res);
  })
  .post("/signup", (req, res) => {
    signup(req, res);
  })
  .post("/login", (req, res) => {
    setCookie(req, res);
  })
  .post("/post/work/:id", (req, res) => {
    postWork(req, res);
  })
  .post("/post/smallgoal/:id", (req, res) => {
    postSmallGoal(req, res);
  })
  .post("/post/guild/:id", (req, res) => {
    postGuild(req, res);
  })
  .post("/post/guild_member/:id", (req, res) => {
    postGuildMember(req, res);
  })
  .post("/post/chat/:id", (req, res) => {
    postChat(req, res);
  })
  .post("/post/cheer", (req, res) => {
    postCheer(req, res);
  })
  .put("/update/profile/:id", (req, res) => {
    updateProfile(req, res);
  })
  .put("/update/work/completed", (req, res) => {
    completedWork(req, res);
  })
  .put("/update/smallgoal/completed", (req, res) => {
    completedSmallGoal(req, res);
  })
  .put("/update/user/level/:id", (req, res) => {
    updateLevel(req, res);
  })
  .put("/update/user/title/:id", (req, res) => {
    updateTitle(req, res);
  })
  .put("/update/totaltime/:id", (req, res) => {
    updateTotalTime(req, res);
  })
  .put("/update/report/:day/:id", (req, res) => {
    updateReport(req, res);
  })
  .delete("/delete/work", (req, res) => {
    deleteWork(req, res);
  })
  .delete("/delete/smallgoal", (req, res) => {
    deleteSmallGoal(req, res);
  })
  .delete("/delete/cheer", (req, res) => {
    deleteCheer(req, res);
  })
  .delete("/delete/guild/member", (req, res) => {
    deleteGuildMember(req, res);
  })
  .delete("/delete/guild/", (req, res) => {
    deleteGuild(req, res);
  });
