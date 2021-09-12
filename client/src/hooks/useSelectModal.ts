import { useCallback, useState } from "react";

type Props = {
  select: "profile" | "add" | "complete";
  onOpen: () => void;
};

export const useSelectModal = () => {
  const [selectModal, setSelectModal] = useState("");

  const onSelectModal = useCallback((props: Props) => {
    const { select, onOpen } = props;

    setSelectModal(select);
    onOpen();
  }, []);

  return { selectModal, onSelectModal };
};
