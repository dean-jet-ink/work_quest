import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { Week } from "../types/week";
import { axios } from "../apis/axios";

export const useReport = (userId: number) => {
  const [week, setWeek] = useState<Week>({} as Week);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`/fetch/report/${userId}`)
        .then((res) => {
          setWeek(res.data);
        })
        .catch((err) => {
          throw err;
        });
    };
    fetch();
  }, [userId]);

  const recordTimeOnReport = useCallback(
    (time: number) => {
      const today = moment().format("dddd").toLowerCase();

      axios.put(`/update/report/${today}/${userId}`, { time }).catch((err) => {
        throw err;
      });
    },
    [userId]
  );

  return { week, setWeek, recordTimeOnReport };
};
