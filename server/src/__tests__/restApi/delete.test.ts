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
  it("deleteWorkのテスト", async () => {
    const payload = {
      id: 1,
    };
    const res = await request.delete("/delete/work").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/works/1");
    expect(res2.status).toBe(200);
    expect(res2.body).toHaveLength(1);
  });
  it("deleteSmallGoalのテスト", async () => {
    const payload = {
      id: 1,
    };
    const res = await request.delete("/delete/smallgoal").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/smallgoals/1");
    expect(res2.status).toBe(200);
    expect(res2.body).toHaveLength(1);
  });
  it("deleteGuildMemberのテスト", async () => {
    const payload = {
      userId: 2,
      guildId: 1,
    };
    const res = await request.delete("/delete/guild/member").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/guild/members/1");
    expect(res2.status).toBe(200);
    expect(res2.body).toHaveLength(1);
  });
  it("deleteGuildのテスト、ギルド及びそのギルドのメンバーも削除", async () => {
    const payload = {
      guildId: 1,
    };
    const res = await request.delete("/delete/guild").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/guild/1");
    expect(res2.status).toBe(200);
    expect(res2.body.guild_id).toBeFalsy();
    const res3 = await request.get("/fetch/guild/members/1");
    expect(res3.status).toBe(200);
    expect(res3.body).toHaveLength(0);
  });
  it("deleteCheerのテスト", async () => {
    const payload = {
      userId: 1,
      targetId: 2,
    };
    const res = await request.delete("/delete/cheer").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/cheer/1");
    expect(res2.status).toBe(200);
    expect(res2.body).toHaveLength(0);
  });
});
