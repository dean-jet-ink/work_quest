import { useState } from "react";

export const useDisclosureWork = () => {
  const [isOpenWork, setIsOpenWork] = useState(false);

  const onOpenWork = () => {
    setIsOpenWork(true);
  };
  const onCloseWork = () => {
    setIsOpenWork(false);
  };

  return { isOpenWork, onCloseWork, onOpenWork };
};
