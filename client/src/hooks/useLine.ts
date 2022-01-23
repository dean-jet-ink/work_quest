import { useCallback, useEffect, useState } from "react";

export const useLine = (init: string) => {
  const [line, setLine] = useState("");

  const changeLine = useCallback((otherLine: string) => {
    setLine(otherLine);
  }, []);

  useEffect(() => {
    setLine(init);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { line, changeLine };
};
