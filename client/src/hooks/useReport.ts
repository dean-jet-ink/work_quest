import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Week } from "../types/week";

export const useReport = (userId: number) => {
  const [week, setWeek] = useState<Week>({} as Week);

  useEffect(() => {
    axios.get(`http://localhost:4000/fetch/report/${userId}`).then((res) => {
      setWeek(res.data);
    });
  }, [userId]);

  const recordTimeOnReport = useCallback(
    (time: number) => {
      const today = moment().format("dddd").toLowerCase();

      axios
        .put(`http://localhost:4000/update/report/${today}/${userId}`, { time })
        .catch((err) => {
          if (err) throw err;
        });
    },
    [userId]
  );

  return { week, setWeek, recordTimeOnReport };
};
