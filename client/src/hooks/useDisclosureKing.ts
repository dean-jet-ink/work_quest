import { useState } from "react";

export const useDisclosureKing = () => {
  const [isOpenKing, setIsOpenKing] = useState(false);

  const onOpenKing = () => {
    setIsOpenKing(true);
  };
  const onCloseKing = () => {
    setIsOpenKing(false);
  };

  return { isOpenKing, onCloseKing, onOpenKing };
};
