import { useState } from "react";

export const useDisclosures = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const onOpen1 = () => {
    setIsOpen1(true);
  };
  const onClose1 = () => {
    setIsOpen1(false);
  };

  const onOpen2 = () => {
    setIsOpen2(true);
  };
  const onClose2 = () => {
    setIsOpen2(false);
  };

  const onOpen3 = () => {
    setIsOpen3(true);
  };
  const onClose3 = () => {
    setIsOpen3(false);
  };

  const onOpen4 = () => {
    setIsOpen4(true);
  };
  const onClose4 = () => {
    setIsOpen4(false);
  };

  return {
    isOpen1,
    isOpen2,
    isOpen3,
    isOpen4,
    onClose1,
    onClose2,
    onClose3,
    onClose4,
    onOpen1,
    onOpen2,
    onOpen3,
    onOpen4,
  };
};
