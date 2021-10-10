import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { useShowMessage } from "./useShowMessage";
import axios from "axios";
import { useReport } from "../hooks/useReport";

type Props = {
  limit: number;
  rest: number;
  id: number;
  userId: number;
};

export const useBattle = (props: Props) => {
  const { limit, rest, id, userId } = props;
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
  const round = (time: number) => {
    return Math.round((time / 60 / 60) * 10) / 10;
  };

  // スモールゴール情報取得およびcountdown開始
  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch/smallgoal/battle/${id}`)
      .then((res) => {
        setSmallGoalName(res.data.small_goal_name);
        setTotalTime(res.data.total_time);
        console.log(limit);
        startCountdown();
        setActive(true);
      });
  }, []);

  // timeLeftステイトに関心を持ち、timeup関数実行
  useEffect(() => {
    timeup();
  }, [timeLeft]);

  // timeLeftステイトから毎秒１ずつ減算するsetIntervalを、countdownステイトに代入
  const startCountdown = useCallback(() => {
    if (!active) {
      setCountdown(
        setInterval(() => {
          setTimeLeft((prev: number) => --prev);
        }, 1000)
      );
      setActive(true);
    }
  }, [active, timeLeft, countdown]);

  // timeLeftステイトが0になったときの処理
  const timeup = useCallback(() => {
    if (timeLeft == 0) {
      clearInterval(countdown);
      setActive(false);
      if (!finish) {
        showMessage({ description: "敵を倒した！", status: "success" });
        setTimeLeft(rest);
        setFinish(true);

        // 0.4h
        const addTime = round(limit);
        axios
          .put(`http://localhost:4000/update/totaltime/${id}`, {
            totalTime: addTime,
            userId,
          })
          .then((res) => {
            setTotalTime(res.data.total_time);
          })
          .catch((err) => {
            if (err) throw err;
          });

        recordTimeOnReport(addTime);
      } else {
        setFinish(false);
        setTimeLeft(limit);
      }
    }
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

  // 前ページに戻る
  const onClickReset = () => {
    // 経過時間を加算
    const addTime = round(limit - timeLeft);
    axios.put(`http://localhost:4000/update/totaltime/${id}`, {
      totalTime: addTime,
      userId,
    });
    recordTimeOnReport(addTime);

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
