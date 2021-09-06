import { Router, json, urlencoded } from "express";
import { auth } from "../models/auth";
import { completedSmallGoal } from "../models/db/querys/completedSmallGoal";
import { completedWork } from "../models/db/querys/completedWork";
import { deleteSmallGoal } from "../models/db/querys/deleteSmallGoal";
import { deleteWork } from "../models/db/querys/deleteWork";
import { fetchSmallGoalOnBattle } from "../models/db/querys/fetchSmallGoalOnBattle";
import { fetchSmallGoals } from "../models/db/querys/fetchSmallGoals";
import { fetchUser } from "../models/db/querys/fetchUser";
import { fetchWorks } from "../models/db/querys/fetchWorks";
import { postSmallGoal } from "../models/db/querys/postSmallGoal";
import { postWork } from "../models/db/querys/postWork";
import { setCookie } from "../models/db/querys/setCookie";
import { signup } from "../models/db/querys/signup";
import { updateLevel } from "../models/db/querys/updateLevel";
import { updateProfile } from "../models/db/querys/updateProfile";
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
  .get("/fetch/works/:id", (req, res) => {
    fetchWorks(req, res);
  })
  .get("/fetch/smallgoals/:id", (req, res) => {
    fetchSmallGoals(req, res);
  })
  .get("/fetch/smallgoal/battle/:id", (req, res) => {
    fetchSmallGoalOnBattle(req, res);
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
  .put("/update/profile", (req, res) => {
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
  .delete("/delete/work", (req, res) => {
    deleteWork(req, res);
  })
  .delete("/delete/smallgoal", (req, res) => {
    deleteSmallGoal(req, res);
  });
