import { useState } from "react";

export const useDisclosureCheer = () => {
  const [isOpenCheer, setIsOpenCheer] = useState(false);

  const onOpenCheer = () => {
    setIsOpenCheer(true);
  };
  const onCloseCheer = () => {
    setIsOpenCheer(false);
  };

  return { isOpenCheer, onCloseCheer, onOpenCheer };
};
