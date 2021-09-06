import { useState } from "react";

export const useDisclosureProfile = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const onOpenProfile = () => {
    setIsOpenProfile(true);
  };
  const onCloseProfile = () => {
    setIsOpenProfile(false);
  };

  return { isOpenProfile, onCloseProfile, onOpenProfile };
};
