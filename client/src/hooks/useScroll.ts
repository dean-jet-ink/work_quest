import { RefObject, useCallback } from "react";

export const useScroll = (ref: RefObject<HTMLDivElement>) => {
  const displayBottom = useCallback(() => {
    if (ref.current) {
      const scroll = ref.current.scrollHeight;
      ref.current.scrollTop = scroll;
    }
  }, []);

  return { displayBottom };
};
