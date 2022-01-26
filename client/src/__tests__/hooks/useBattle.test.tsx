import { cleanup, renderHook, act } from "@testing-library/react-hooks";
import moment from "moment";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { useBattle } from "../../hooks/useBattle";

const props = {
  limit: 1,
  rest: 1,
  workId: 1,
  smallGoalId: 1,
  userId: 1,
};

const today = moment().format("dddd").toLowerCase();

const sleep = (period: number) => {
  return new Promise((resolve) => setTimeout(resolve, period));
};

const handlers = [
  rest.get(
    "http://localhost:4000/fetch/smallgoal/battle/1",
    (req, res, ctx) => {
      return res(
        ctx.json({
          small_goal_name: "テスト",
          total_time: 10,
        })
      );
    }
  ),
  rest.get("http://localhost:4000/fetch/report/1", (req, res, ctx) => {
    return res(
      ctx.json({
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 7,
      })
    );
  }),
  rest.put("http://localhost:4000/update/totaltime/1", (req, res, ctx) => {
    return res(
      ctx.json({
        total_time: 10,
      })
    );
  }),
  rest.put(
    `http://localhost:4000/update/report/${today}/1`,
    (req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
];
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("useBatttleカスタムフックのテスト", () => {
  //状態遷移テストとして、1スイッチカバレッジを採用
  //関係行列
  //                         遷移後
  //
  //               プレイ	      停止	   休憩待機	    休憩
  //             +----------+----------+----------+----------+
  //  	プレイ   |		SP    |          |          |    TUP   |
  //遷           +----------+----------+----------+----------+
  //移	停止     |	        |    PS    |    PTU   |          |
  //前		       +----------+----------+----------+----------+
  //  	休憩待機 |				  |  PSorTU  |          |          |
  //             +----------+----------+----------+----------+
  //    休憩		 |  SorTUP  |          |          |          |
  //	           +----------+----------+----------+----------+
  //
  //              イベント P=プレイ S=ストップ TU=タイムアップ SorTU=ストップorタイムアップ
  it("プレイからプレイ(S->P)への状態遷移", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    act(() => {
      result.current.onClickStop();
    });
    expect(result.current.active).toBeFalsy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
  });
  it("プレイから休憩(TU->P)への状態遷移", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    await act(async () => {
      await sleep(1000);
    });
    await waitForNextUpdate();
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeTruthy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
    expect(result.current.finish).toBeTruthy();
  });
  it("停止から停止(P->S)への状態遷移", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    act(() => {
      result.current.onClickStop();
    });
    expect(result.current.active).toBeFalsy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
    act(() => {
      result.current.onClickStop();
    });
    expect(result.current.active).toBeFalsy();
  });
  it("停止から休憩待機(P->TU)への状態遷移", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    act(() => {
      result.current.onClickStop();
    });
    expect(result.current.active).toBeFalsy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
    await act(async () => {
      await sleep(1000);
    });
    await waitForNextUpdate();
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeTruthy();
  });
  it("休憩待機から停止(P->S)への状態遷移", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    await act(async () => {
      await sleep(1000);
    });
    await waitForNextUpdate();
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeTruthy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
    expect(result.current.finish).toBeTruthy();
    act(() => {
      result.current.onClickFinish();
    });
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeFalsy();
  });
  it("休憩待機から停止(P->TU)への状態遷移2", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    await act(async () => {
      await sleep(1000);
    });
    await waitForNextUpdate();
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeTruthy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
    expect(result.current.finish).toBeTruthy();
    await act(async () => {
      await sleep(1000);
    });
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeFalsy();
  });
  it("休憩からプレイ(S->P)への状態遷移", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    await act(async () => {
      await sleep(1000);
    });
    await waitForNextUpdate();
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeTruthy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
    expect(result.current.finish).toBeTruthy();
    act(() => {
      result.current.onClickFinish();
    });
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeFalsy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
  });
  it("休憩からプレイ(TU->P)への状態遷移2", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBattle(props));
    await waitForNextUpdate();
    await act(async () => {
      await sleep(1000);
    });
    await waitForNextUpdate();
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeTruthy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
    expect(result.current.finish).toBeTruthy();
    await act(async () => {
      await sleep(1000);
    });
    expect(result.current.active).toBeFalsy();
    expect(result.current.finish).toBeFalsy();
    act(() => {
      result.current.onClickStart();
    });
    expect(result.current.active).toBeTruthy();
  });
});
