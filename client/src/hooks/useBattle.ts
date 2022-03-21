import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { useShowMessage } from "./useShowMessage";
import { useReport } from "../hooks/useReport";
import { axios } from "../apis/axios";

type Props = {
  limit: number;
  rest: number;
  workId: number;
  smallGoalId: number;
  userId: number;
};

export const useBattle = (props: Props) => {
  const { limit, rest, workId, smallGoalId, userId } = props;
  const [timeLeft, setTimeLeft] = useState<number>(limit);
  const [countdown, setCountdown] = useState<any>();
  const [active, setActive] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const history = useHistory();
  const { showMessage } = useShowMessage();
  const [smallGoalName, setSmallGoalName] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const { recordTimeOnReport } = useReport(userId);

  // 小数第二位以下四捨五入
  // 一時間単位でtotal_timeにプラス
  const round = async (time: number) => {
    return await (Math.round((time / 60 / 60) * 10) / 10);
  };

  // スモールゴール情報取得およびcountdown開始
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`/fetch/smallgoal/battle/${smallGoalId}`)
        .then((res) => {
          setSmallGoalName(res.data.small_goal_name);
          setTotalTime(res.data.total_time);
          startCountdown();
          setActive(true);
        })
        .catch((err) => {
          throw err;
        });
    };
    fetch();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // timeLeftがゼロならタイムアップ
  useEffect(() => {
    timeup();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // timeLeftから毎秒１ずつ減算するsetIntervalの処理を、countdownに代入
  const startCountdown = useCallback(() => {
    if (!active) {
      setCountdown(
        setInterval(() => {
          setTimeLeft((prev: number) => --prev);
        }, 1000)
      );
      setActive(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, timeLeft, countdown]);

  const asyncUpdateTotalTime = async (addTime: number) => {
    await axios
      .put(`/update/totaltime/${smallGoalId}`, {
        addTime,
        workId,
        userId,
      })
      .catch((err) => {
        throw err;
      });
  };

  // timeLeftが0になったときの処理
  const timeup = useCallback(async () => {
    if (timeLeft === 0) {
      clearInterval(countdown);
      setActive(false);
      if (!finish) {
        const addTime = await round(limit);
        await recordTimeOnReport(addTime);
        await asyncUpdateTotalTime(addTime);
        showMessage({ description: "敵を倒した！", status: "success" });
        setTimeLeft(rest);
        setTotalTime((prev) => (prev * 10 + addTime * 10) / 10); //javascriptの浮動小数点数の計算の誤差を消すため、一度整数に戻す
        setFinish(true);
      } else {
        setTimeLeft(limit);
        setFinish(false);
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // countdownを開始
  const onClickStart = () => {
    if (!active) {
      clearInterval(countdown);
      startCountdown();
      setActive(true);
    }
  };

  // countdownを停止
  const onClickStop = () => {
    if (active) {
      clearInterval(countdown);
      setActive(false);
    }
  };

  // 前ページに戻る際に、プレイ中なら経過時間を加算
  const onClickReset = async () => {
    if (!finish) {
      const addTime = await round(limit - timeLeft);
      axios.put(`/update/totaltime/${smallGoalId}`, {
        addTime,
        workId,
        userId,
      });
      recordTimeOnReport(addTime);
    }
    onClickStop();
    history.goBack();
  };

  // 休憩を終えて待機状態に移行
  const onClickFinish = () => {
    clearInterval(countdown);
    setTimeLeft(limit);
    setActive(false);
    setFinish(false);
  };

  // 数値を時間（00:00）に変換
  const toTimeFormat = (time: number) =>
    moment.utc(time * 1000).format("mm:ss");

  return {
    smallGoalName,
    totalTime,
    active,
    timeLeft,
    finish,
    timeup,
    onClickStart,
    onClickStop,
    onClickReset,
    onClickFinish,
    toTimeFormat,
  };
};
