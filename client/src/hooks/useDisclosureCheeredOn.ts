import { useState } from "react";

export const useDisclosureCheeredOn = () => {
  const [isOpenCheeredOn, setIsOpenCheeredOn] = useState(false);

  const onOpenCheeredOn = () => {
    setIsOpenCheeredOn(true);
  };
  const onCloseCheeredOn = () => {
    setIsOpenCheeredOn(false);
  };

  return { isOpenCheeredOn, onCloseCheeredOn, onOpenCheeredOn };
};
