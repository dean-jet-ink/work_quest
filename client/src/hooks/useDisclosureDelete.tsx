import { useState } from "react";

export const useDisclosureDelete = () => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const onOpenDelete = () => {
    setIsOpenDelete(true);
  };
  const onCloseDelete = () => {
    setIsOpenDelete(false);
  };

  return { isOpenDelete, onCloseDelete, onOpenDelete };
};
