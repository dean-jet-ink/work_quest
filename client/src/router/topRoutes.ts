import { Top } from "../components/pages/Top";
import { Profile } from "../components/pages/Profile";
import { Ranking } from "../components/pages/Ranking";
import { Guild } from "../components/pages/Guild";
import { MyGuild } from "../components/pages/MyGuild";
import { Report } from "../components/pages/Report";
import { Work } from "../components/pages/Work";
import { Battle } from "../components/pages/Battle";
import { Member } from "../components/pages/Member";
import { RouteProps } from "react-router-dom";

export const topRoutes: Array<RouteProps & { key: number }> = [
  {
    key: 1,
    path: "/",
    exact: true,
    component: Top,
  },
  {
    key: 2,
    path: "/profile",
    exact: false,
    component: Profile,
  },
  {
    key: 3,
    path: "/ranking",
    exact: false,
    component: Ranking,
  },
  {
    key: 4,
    path: "/guild",
    exact: false,
    component: Guild,
  },
  {
    key: 5,
    path: "/myguild/:id",
    exact: false,
    component: MyGuild,
  },
  {
    key: 6,
    path: "/report",
    exact: false,
    component: Report,
  },
  {
    key: 7,
    path: "/work/:id",
    exact: false,
    component: Work,
  },
  {
    key: 8,
    path: "/battle/:workId/:smallGoalId",
    exact: false,
    component: Battle,
  },
  {
    key: 9,
    path: "/member/:id",
    exact: false,
    component: Member,
  },
];
