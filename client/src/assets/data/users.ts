import { User } from "../../types/user";

import person_1 from "../../image/person/person_1.png";
import person_2 from "../../image/person/person_2.png";
import person_3 from "../../image/person/person_3.png";
import person_4 from "../../image/person/person_4.jpg";

export const users: Array<User> = [
  {
    user_id: 1,
    user_name: "あずさ",
    mail: "azusa@icloud.com",
    picture: person_1,
    sex: "female",
    comment: "デザインとマーケティングの勉強をがんばっています！",
    total_time: 35,
    title: "近衛兵",
    white_noise: "clock",
    level: 10,
  },
  {
    user_id: 2,
    user_name: "けんた",
    mail: "kenta@icloud.com",
    picture: person_2,
    sex: "male",
    comment: "がんばります！",
    total_time: 31,
    title: "番兵",
    white_noise: "clock",
    level: 10,
  },
  {
    user_id: 3,
    user_name: "アズーサ",
    mail: "azu-sa@icloud.com",
    picture: person_4,
    sex: "female",
    comment: "がんばります！",
    total_time: 15,
    title: "村人A",
    white_noise: "clock",
    level: 10,
  },
  {
    user_id: 4,
    user_name: "じんけん",
    mail: "jinken@icloud.com",
    picture: person_3,
    sex: "male",
    comment: "がんばります！",
    total_time: 7,
    title: "原始人",
    white_noise: "clock",
    level: 10,
  },
];
