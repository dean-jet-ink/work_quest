import { useCallback, useEffect, useState } from "react";
import moment from "moment";

export const useDeadline = (deadline: string | null) => {
  const [colorInfo, setColorInfo] = useState<
    "inherit" | "orange" | "red" | "#afafaf8f"
  >("inherit");

  const handleDeadline = useCallback((deadline: string) => {
    const fromDate = moment();
    const toDate = moment(deadline);
    const daysLeft = toDate.diff(fromDate, "days", true);

    // 締め切りに対しての残り日数によって、締め切り日の文字色変化
    switch (true) {
      case daysLeft > 3:
        setColorInfo("inherit");
        break;
      case daysLeft > 1 && daysLeft <= 3:
        setColorInfo("orange");
        break;
      case daysLeft >= -1 && daysLeft <= 1:
        setColorInfo("red");
        break;
      case daysLeft < -1:
        setColorInfo("#afafaf8f");
        break;
      default:
        setColorInfo("inherit");
    }
  }, []);

  useEffect(() => {
    if (deadline) {
      handleDeadline(deadline);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  return { colorInfo };
};
