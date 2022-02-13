import { Router, json, urlencoded } from "express";

import { auth } from "../models/utils/auth";
import { completedSmallGoal } from "../models/rest/completedSmallGoal";
import { completedWork } from "../models/rest/completedWork";
import { deleteCheer } from "../models/rest/deleteCheer";
import { deleteGuild } from "../models/rest/deleteGuild";
import { deleteGuildMember } from "../models/rest/deleteGuildMember";
import { deleteSmallGoal } from "../models/rest/deleteSmallGoal";
import { deleteWork } from "../models/rest/deleteWork";
import { fetchChat } from "../models/rest/fetchChat";
import { fetchCheer } from "../models/rest/fetchCheer";
import { fetchCheered } from "../models/rest/fetchCheered";
import { fetchGuild } from "../models/rest/fetchGuild";
import { fetchGuildList } from "../models/rest/fetchGuildList";
import { fetchGuildMembers } from "../models/rest/fetchGuildMembers";
import { fetchMyGuild } from "../models/rest/fetchMyGuild";
import { fetchReport } from "../models/rest/fetchReport";
import { fetchSmallGoalOnBattle } from "../models/rest/fetchSmallGoalOnBattle";
import { fetchSmallGoals } from "../models/rest/fetchSmallGoals";
import { fetchUser } from "../models/rest/fetchUser";
import { fetchUserList } from "../models/rest/fetchUserList";
import { fetchWorks } from "../models/rest/fetchWorks";
import { postChat } from "../models/rest/postChat";
import { postCheer } from "../models/rest/postCheer";
import { postGuild } from "../models/rest/postGuild";
import { postGuildMember } from "../models/rest/postGuildMember";
import { postSmallGoal } from "../models/rest/postSmallGoal";
import { postWork } from "../models/rest/postWork";
import { setCookie } from "../models/rest/setCookie";
import { signup } from "../models/rest/signup";
import { updateLevel } from "../models/rest/updateLevel";
import { updateProfile } from "../models/rest/updateProfile";
import { updateReport } from "../models/rest/updateReport";
import { updateSmallGoal } from "../models/rest/updateSmallGoal";
import { updateTitle } from "../models/rest/updateTitle";
import { updateTotalTime } from "../models/rest/updateTotalTime";
import { updateWork } from "../models/rest/updateWork";
import { validateDuplicatedMail } from "../models/rest/validateDuplicatedMail";
import { logout } from "../models/utils/logout";
import { fetchReportOfToday } from "../models/rest/fetchReportOfToday";
import { uploadFile } from "../models/rest/uploadFile";
import { deleteFile } from "../models/rest/deleteFile";
import { fileParser } from "../models/utils/multerConfigure";

export const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router
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
  .get("/fetch/report/:day/:id", (req, res) => {
    fetchReportOfToday(req, res);
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
  .post("/post/file", fileParser.single("file"), (req, res) => {
    uploadFile(req, res);
  })
  .put("/update/profile/:id", (req, res) => {
    updateProfile(req, res);
  })
  .put("/update/work/completed", (req, res) => {
    completedWork(req, res);
  })
  .put("/update/work/:id", (req, res) => {
    updateWork(req, res);
  })
  .put("/update/smallgoal/completed", (req, res) => {
    completedSmallGoal(req, res);
  })
  .put("/update/smallgoal/:id", (req, res) => {
    updateSmallGoal(req, res);
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
  .delete("/delete/guild", (req, res) => {
    deleteGuild(req, res);
  })
  .delete("/delete/file", (req, res) => {
    deleteFile(req, res);
  });
