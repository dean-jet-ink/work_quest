import { useState } from "react";

export const useDisclosureComplete = () => {
  const [isOpenComplete, setIsOpenComplete] = useState(false);

  const onOpenComplete = () => {
    setIsOpenComplete(true);
  };
  const onCloseComplete = () => {
    setIsOpenComplete(false);
  };

  return { isOpenComplete, onCloseComplete, onOpenComplete };
};
