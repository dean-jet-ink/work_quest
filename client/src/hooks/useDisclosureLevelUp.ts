import { useState } from "react";

export const useDisclosureLevelUp = () => {
  const [isOpenLevelUp, setIsOpenLevelUp] = useState(false);

  const onOpenLevelUp = () => {
    setIsOpenLevelUp(true);
  };
  const onCloseLevelUp = () => {
    setIsOpenLevelUp(false);
  };

  return { isOpenLevelUp, onCloseLevelUp, onOpenLevelUp };
};
