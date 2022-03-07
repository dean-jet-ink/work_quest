import { cron } from "../../cron/cron";
import { dbDisconnect } from "../../models/utils/dbconnect";
import { resetDB } from "../testUtils/resetDB";
import { request } from "../testUtils/testRequest";

cron.stop();

describe("postリクエストのテスト", () => {
  beforeEach(async () => {
    await resetDB();
  });
  afterAll(async () => {
    await dbDisconnect();
  });
  it("signup、およびsetCookieのテスト", async () => {
    const payload = {
      userName: "サインアップテスト",
      mail: "signup@test.com",
      pass: "signup",
      picture: "test",
      sex: "male",
      comment: "テスト",
      totalTime: 0,
      level: 1,
      title: 1,
      guildId: null,
      whiteNoise: "clock",
    };
    const res = await request.post("/signup").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.userId).toBe(4);
    expect(res.header["set-cookie"][1]).toBe("auth=true; Path=/");
  });
  it("postWorkのテスト", async () => {
    const payload = {
      workName: "postテスト",
      completed: false,
      created: "2022-12-31 00:00:00",
      deadline: "2023-03-31",
      totalTime: 0,
    };
    const res = await request.post("/post/work/1").send(payload);
    expect(res.status).toBe(200);
    const work = res.body[2];
    expect(work.user_id).toBe(1);
    expect(work.work_id).toBe(4);
    expect(work.work_name).toBe("postテスト");
    expect(work.completed).toBe(0);
    expect(work.deadline).toBe("2023-03-31T00:00:00.000Z");
    expect(work.total_time).toBe(0);
  });
  it("postSmallGoalのテスト", async () => {
    const payload = {
      smallGoalName: "postテスト",
      completed: false,
      created: "2022-12-31 00:00:00",
      totalTime: 0,
    };
    const res = await request.post("/post/smallgoal/1").send(payload);
    expect(res.status).toBe(200);
    const smallGoal = res.body[2];
    expect(smallGoal.work_name).toBe("テスト");
    expect(smallGoal.small_goal_id).toBe(3);
    expect(smallGoal.small_goal_name).toBe("postテスト");
    expect(smallGoal.completed).toBe(0);
    expect(smallGoal.total_time).toBe(0);
  });
  it("postGuildのテスト", async () => {
    const payload = {
      guildName: "postテスト",
      guildPicture: "test",
      comment: "postテスト",
    };
    const res = await request.post("/post/guild/1").send(payload);
    expect(res.status).toBe(200);
    const guild = res.body[1];
    expect(guild.guild_id).toBe(3);
    expect(guild.guild_name).toBe("postテスト");
    expect(guild.comment).toBe("postテスト");
    expect(guild.admin_id).toBe(1);
  });
  it("postGuildMemberのテスト", async () => {
    const payload = {
      guildId: 2,
    };
    const res = await request.post("/post/guild_member/1").send(payload);
    expect(res.status).toBe(200);
    const guild = res.body[1];
    expect(guild.guild_id).toBe(2);
    expect(guild.admin_id).toBe(2);
  });
  it("postChatのテスト", async () => {
    const payload = {
      userId: 1,
      comment: "postテスト",
      time: "2022-12-31 00:00:00",
    };
    const res = await request.post("/post/chat/1").send(payload);
    expect(res.status).toBe(200);
    const chat = res.body[2];
    expect(chat.chat_id).toBe(3);
    expect(chat.guild_id).toBe(1);
    expect(chat.user_id).toBe(1);
    expect(chat.comment).toBe("postテスト");
    expect(chat.created).toBe("2022-12-31T00:00:00.000Z");
  });
  it("postCheerのテスト", async () => {
    const payload = {
      userId: 1,
      targetId: 3,
    };
    const res = await request.post("/post/cheer").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/cheer/1");
    expect(res2.status).toBe(200);
    const cheer = res2.body[1];
    expect(cheer.user_id).toBe(3);
  });
});
