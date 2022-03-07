import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Week } from "../types/week";
import { axios } from "../apis/axios";

export const useReport = (userId: number, memberId?: number) => {
  const [week, setWeek] = useState<number[]>([]);
  const [memberWeek, setMemberWeek] = useState<number[]>([]);
  const today = moment().format("dddd").toLowerCase();

  const distinguishWeekOfDay = useCallback((week: number[]): number[] => {
    switch (true) {
      case today === "monday":
        return week.slice(0, 1);
      case today === "tuesday":
        return week.slice(0, 2);
      case today === "wednesday":
        return week.slice(0, 3);
      case today === "thursday":
        return week.slice(0, 4);
      case today === "friday":
        return week.slice(0, 5);
      case today === "saturday":
        return week.slice(0, 6);
      case today === "sunday":
        return week.slice();
      default:
        return week.slice();
    }
  }, []);

  useEffect(() => {
    const fetch = async (id: number) => {
      await axios
        .get(`/fetch/report/${id}`)
        .then((res) => {
          const {
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
          } = res.data;
          const weekData = [
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
          ];
          const weekOfDay = distinguishWeekOfDay(weekData);
          if (id === userId) {
            setWeek(weekOfDay);
          } else {
            setMemberWeek(weekOfDay);
          }
        })
        .catch((err) => {
          throw err;
        });
    };

    fetch(userId);

    if (memberId) {
      fetch(memberId);
    }
  }, [userId, memberId]);

  const recordTimeOnReport = useCallback(
    (time: number) => {
      axios.put(`/update/report/${today}/${userId}`, { time }).catch((err) => {
        throw err;
      });
    },
    [userId]
  );

  return { week, memberWeek, setWeek, recordTimeOnReport };
};
