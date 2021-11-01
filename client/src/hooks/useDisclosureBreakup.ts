import { useState } from "react";

export const useDisclosureBreakup = () => {
  const [isOpenBreakup, setIsOpenBreakup] = useState(false);

  const onOpenBreakup = () => {
    setIsOpenBreakup(true);
  };
  const onCloseBreakup = () => {
    setIsOpenBreakup(false);
  };

  return { isOpenBreakup, onCloseBreakup, onOpenBreakup };
};
