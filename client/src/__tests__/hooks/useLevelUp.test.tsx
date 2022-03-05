import { act, renderHook } from "@testing-library/react-hooks";

import { useLevelUp } from "../../hooks/useLevelup";
import { User } from "../../types/user";

let user: User = {
  userId: 1,
  userName: "ケンタ",
  mail: "test@test.com",
  picture: "test",
  sex: "male",
  comment: "テストです",
  totalTime: 2,
  title: "村人A",
  whiteNoise: "clock",
  level: 1,
};

describe("useLevelUpカスタムフックのテスト", () => {
  it("レベルごとによる称号の変更", () => {
    const { result } = renderHook(() => useLevelUp(user));

    //同値クラス
    //称号 村人A, 村の力自慢, 見習い兵士, 頼もしい兵士, 騎士, 近衛騎士, 冒険者, 勇者, 伝説の勇者, Messiah
    //境界値
    //level 7, 12, 17, 25, 36, 41, 61, 102, 200
    //以上9つの境界値のon/offポイントをテスト

    let title = result.current.decideTitle(6);
    expect(title).toBe("村人A");
    title = result.current.decideTitle(7);
    expect(title).toBe("村の力自慢");
    title = result.current.decideTitle(11);
    expect(title).toBe("村の力自慢");
    title = result.current.decideTitle(12);
    expect(title).toBe("見習い兵士");
    title = result.current.decideTitle(16);
    expect(title).toBe("見習い兵士");
    title = result.current.decideTitle(17);
    expect(title).toBe("頼もしい兵士");
    title = result.current.decideTitle(24);
    expect(title).toBe("頼もしい兵士");
    title = result.current.decideTitle(25);
    expect(title).toBe("騎士");
    title = result.current.decideTitle(35);
    expect(title).toBe("騎士");
    title = result.current.decideTitle(36);
    expect(title).toBe("近衛騎士");
    title = result.current.decideTitle(40);
    expect(title).toBe("近衛騎士");
    title = result.current.decideTitle(41);
    expect(title).toBe("冒険者");
    title = result.current.decideTitle(60);
    expect(title).toBe("冒険者");
    title = result.current.decideTitle(61);
    expect(title).toBe("勇者");
    title = result.current.decideTitle(101);
    expect(title).toBe("勇者");
    title = result.current.decideTitle(102);
    expect(title).toBe("伝説の勇者");
    title = result.current.decideTitle(199);
    expect(title).toBe("伝説の勇者");
    title = result.current.decideTitle(200);
    expect(title).toBe("Messiah");
  });
  it("総時間により、レベル算出", () => {
    const { result, rerender } = renderHook((user: User) => useLevelUp(user), {
      initialProps: user,
    }); //totalTimeの初期値は2

    //同値クラス
    //レベル 1 ~ 10
    //境界値
    //経験値 3, 5, 9, 16, 24, 34, 45, 58, 72
    //以上9つの境界値のon/offポイントをテスト

    const onOpen = jest.fn();
    const onClickPraise = jest.fn();
    const onClickParty = jest.fn();
    const props = { onOpen, onClickPraise, onClickParty };

    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(1);
    user.totalTime = 3;
    user = { ...user }; //再代入しないと、rerenderが前のものを引数としてしまう
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(2);
    user.totalTime = 4;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(2);
    user.totalTime = 5;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(3);
    user.totalTime = 8;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(3);
    user.totalTime = 9;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(4);
    user.totalTime = 15;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(4);
    user.totalTime = 16;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(5);
    user.totalTime = 23;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(5);
    user.totalTime = 24;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(6);
    user.totalTime = 33;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(6);
    user.totalTime = 34;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(7);
    user.totalTime = 44;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(7);
    user.totalTime = 45;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(8);
    user.totalTime = 57;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(8);
    user.totalTime = 58;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(9);
    user.totalTime = 71;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(9);
    user.totalTime = 72;
    user = { ...user };
    rerender(user);
    act(() => {
      result.current.onClickLevelUp(props);
    });
    expect(result.current.level).toBe(10);
  });
});
