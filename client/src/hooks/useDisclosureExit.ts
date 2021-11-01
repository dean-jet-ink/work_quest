import { useState } from "react";

export const useDisclosureExit = () => {
  const [isOpenExit, setIsOpenExit] = useState(false);

  const onOpenExit = () => {
    setIsOpenExit(true);
  };
  const onCloseExit = () => {
    setIsOpenExit(false);
  };

  return { isOpenExit, onCloseExit, onOpenExit };
};
