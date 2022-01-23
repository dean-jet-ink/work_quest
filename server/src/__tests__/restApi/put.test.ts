import { dbDisconnect } from "../../models/utils/dbconnect";
import { resetDB } from "../testUtils/resetDB";
import { request } from "../testUtils/testRequest";

describe("putリクエストのテスト", () => {
  beforeEach(async () => {
    await resetDB();
  });
  afterAll(async () => {
    await dbDisconnect();
  });
  it("updateProfileのテスト", async () => {
    const payload = {
      picture: "test",
      name: "putテスト",
      mail: "test@test.com",
      sex: "male",
      comment: "putテスト",
    };
    const res = await request.put("/update/profile/1").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.user_name).toBe("putテスト");
    expect(res.body.comment).toBe("putテスト");
  });
  it("updateWorkのテスト", async () => {
    const payload = {
      workId: 1,
      workName: "putテスト",
      deadline: "2024-01-01",
    };
    const res = await request.put("/update/work/1").send(payload);
    expect(res.status).toBe(200);
    const work = res.body[0];
    expect(work.work_name).toBe("putテスト");
    expect(work.deadline).toBe("2024-01-01T00:00:00.000Z");
  });
  it("completedWorkのテスト", async () => {
    const payload = {
      completed: true,
      id: 1,
    };
    const res = await request.put("/update/work/completed").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/works/1");
    expect(res2.status).toBe(200);
    const work = res2.body[0];
    expect(work.completed).toBe(1);
  });
  it("updateSmallGoalのテスト", async () => {
    const payload = {
      smallGoalName: "putテスト",
      smallGoalId: 1,
    };
    const res = await request.put("/update/smallgoal/1").send(payload);
    expect(res.status).toBe(200);
    const work = res.body[0];
    expect(work.small_goal_name).toBe("putテスト");
  });
  it("completedSmallGoalのテスト", async () => {
    const payload = {
      completed: true,
      id: 2,
    };
    const res = await request.put("/update/smallgoal/completed").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/smallgoals/1");
    expect(res2.status).toBe(200);
    const smallGoal = res2.body[0];
    expect(smallGoal.completed).toBe(1);
  });
  it("updateLevelのテスト", async () => {
    const payload = {
      level: 2,
    };
    const res = await request.put("/update/user/level/1").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.level).toBe(2);
  });
  it("updateTitleのテスト", async () => {
    const payload = {
      title: "村の力自慢",
    };
    const res = await request.put("/update/user/title/1").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/user/1");
    expect(res2.status).toBe(200);
    expect(res2.body.title).toBe("村の力自慢");
  });
  it("updateTotalTimeのテスト", async () => {
    const payload = {
      addTime: 1,
      workId: 1,
      userId: 1,
    };
    const res = await request.put("/update/totaltime/1").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/user/1");
    expect(res2.status).toBe(200);
    expect(res2.body.total_time).toBe(1);
    const res3 = await request.get("/fetch/works/1");
    expect(res3.status).toBe(200);
    expect(res3.body[0].total_time).toBe(1);
    const res4 = await request.get("/fetch/smallgoals/1");
    expect(res4.status).toBe(200);
    expect(res4.body[0].total_time).toBe(1);
  });
  it("updateReportのテスト", async () => {
    const payload = {
      time: 1,
    };
    const res = await request.put("/update/report/monday/1").send(payload);
    expect(res.status).toBe(200);
    const res2 = await request.get("/fetch/report/1");
    expect(res2.status).toBe(200);
    expect(res2.body.monday).toBe(2);
  });
});
