import { dbDisconnect } from "../../models/utils/dbconnect";
import { resetDB } from "../testUtils/resetDB";
import { request } from "../testUtils/testRequest";

describe("getリクエストのテスト", () => {
  beforeEach(async () => {
    await resetDB();
  });
  afterAll(async () => {
    await dbDisconnect();
  });
  it("fetchUserのレスポンステスト", async () => {
    const res = await request.get("/fetch/user/1");
    expect(res.status).toBe(200);
    expect(res.body.user_id).toBe(1);
    expect(res.body.user_name).toBe("テスト");
    expect(res.body.mail).toBe("test@test.com");
    expect(res.body.sex).toBe("male");
    expect(res.body.comment).toBe("テスト");
    expect(res.body.total_time).toBe(0);
    expect(res.body.level).toBe(1);
    expect(res.body.title).toBe("村人A");
    expect(res.body.white_noise).toBe("clock");
  });
  it("fetchUserListのレスポンステスト", async () => {
    const res = await request.get("/fetch/userlist/20");
    const user1 = res.body[0];
    const user2 = res.body[1];

    // ユーザー1
    expect(res.status).toBe(200);
    expect(user1.user_id).toBe(1);
    expect(user1.user_name).toBe("テスト");
    expect(user1.mail).toBe("test@test.com");
    expect(user1.sex).toBe("male");
    expect(user1.comment).toBe("テスト");
    expect(user1.total_time).toBe(0);
    expect(user1.level).toBe(1);
    expect(user1.title).toBe("村人A");
    expect(user1.white_noise).toBe("clock");

    // ユーザー2
    expect(res.status).toBe(200);
    expect(user2.user_id).toBe(2);
    expect(user2.mail).toBe("test2@test.com");
    expect(user2.sex).toBe("female");
  });
  it("fetchWorksのレスポンステスト", async () => {
    const res = await request.get("/fetch/works/1");
    const work1 = res.body[0];
    const work2 = res.body[1];

    expect(res.status).toBe(200);

    // ワーク1
    expect(work1.work_id).toBe(1);
    expect(work1.work_name).toBe("テスト");
    expect(work1.completed).toBe(0);
    expect(work1.deadline).toBe("2023-03-31T00:00:00.000Z");
    expect(work1.total_time).toBe(0);

    // ワーク2
    expect(work2.work_id).toBe(2);
    expect(work2.completed).toBe(1);

    const res2 = await request.get("/fetch/works/2");

    expect(res2.status).toBe(200);
    expect(res2.body[0].work_id).toBe(3);
    expect(res2.body[0].completed).toBe(0);
  });
  it("fetchSmallGoalsのレスポンステスト", async () => {
    const res = await request.get("/fetch/smallgoals/1");
    const smallGoal1 = res.body[0];
    const smallGoal2 = res.body[1];

    expect(res.status).toBe(200);

    // スモールゴール1
    expect(smallGoal1.small_goal_id).toBe(1);
    expect(smallGoal1.small_goal_name).toBe("テスト");
    expect(smallGoal1.completed).toBe(1);
    expect(smallGoal1.total_time).toBe(0);

    // スモールゴール2
    expect(smallGoal2.small_goal_id).toBe(2);
    expect(smallGoal2.small_goal_name).toBe("テスト");
    expect(smallGoal2.completed).toBe(0);
  });
  it("fetchSmallGoalOnBattleのレスポンステスト", async () => {
    const res = await request.get("/fetch/smallgoal/battle/1");

    expect(res.status).toBe(200);

    expect(res.body.small_goal_name).toBe("テスト");
    expect(res.body.total_time).toBe(0);
  });
  it("fetchGuildのレスポンステスト", async () => {
    const res = await request.get("/fetch/guild/1");

    expect(res.status).toBe(200);

    expect(res.body.guild_id).toBe(1);
    expect(res.body.guild_name).toBe("テスト");
    expect(res.body.comment).toBe("テスト");
    expect(res.body.admin_id).toBe(1);
  });
  it("fetchGuildListのレスポンステスト", async () => {
    const res = await request.get("/fetch/guildlist");
    const guild = res.body[0];

    expect(res.status).toBe(200);

    expect(guild.guild_id).toBe(1);
    expect(guild.guild_name).toBe("テスト");
    expect(guild.comment).toBe("テスト");
    expect(guild.admin_id).toBe(1);
  });
  it("fetchMyGuildのレスポンステスト", async () => {
    const res = await request.get("/fetch/myguild/1");
    const guild = res.body[0];

    expect(res.status).toBe(200);

    expect(guild.guild_id).toBe(1);
    expect(guild.guild_name).toBe("テスト");
    expect(guild.comment).toBe("テスト");
    expect(guild.admin_id).toBe(1);
  });
  it("fetchGuildMembersのレスポンステスト", async () => {
    const res = await request.get("/fetch/guild/members/1");
    const guildMember1 = res.body[0];
    const guildMember2 = res.body[1];

    expect(res.status).toBe(200);

    // ユーザー1
    expect(guildMember1.user_id).toBe(1);

    // ユーザー2
    expect(guildMember2.user_id).toBe(2);
  });
  it("fetchChatのレスポンステスト", async () => {
    const res = await request.get("/fetch/chat/1");
    const chat1 = res.body[0];
    const chat2 = res.body[1];

    expect(res.status).toBe(200);

    // チャット1
    expect(chat1.chat_id).toBe(1);
    expect(chat1.guild_id).toBe(1);
    expect(chat1.user_id).toBe(1);
    expect(chat1.comment).toBe("テスト");
    expect(chat1.created).toBe("2022-01-12T22:06:40.000Z");

    // チャット2
    expect(chat2.chat_id).toBe(2);
    expect(chat2.guild_id).toBe(1);
    expect(chat2.user_id).toBe(2);
    expect(chat2.comment).toBe("テスト\nテスト");
    expect(chat2.created).toBe("2022-01-12T22:09:54.000Z");
  });
  it("fetchCheerのレスポンステスト", async () => {
    const res = await request.get("/fetch/cheer/1");
    const user = res.body[0];

    expect(res.status).toBe(200);

    expect(user.user_id).toBe(2);

    const res2 = await request.get("/fetch/cheer/2");
    const user2 = res2.body[0];

    expect(res2.status).toBe(200);

    expect(user2.user_id).toBe(1);
  });
  it("fetchReportのレスポンステスト", async () => {
    const res = await request.get("/fetch/report/1");

    expect(res.status).toBe(200);
    expect(res.body.monday).toBe(1);
    expect(res.body.tuesday).toBe(2);
    expect(res.body.wednesday).toBe(3);
    expect(res.body.thursday).toBe(4);
    expect(res.body.friday).toBe(3);
    expect(res.body.saturday).toBe(2);
    expect(res.body.sunday).toBe(1);
  });
  it("fetchReportTodayのレスポンステスト", async () => {
    const res = await request.get("/fetch/report/monday/1");

    expect(res.status).toBe(200);
    expect(res.body.monday).toBe(1);
  });
});
