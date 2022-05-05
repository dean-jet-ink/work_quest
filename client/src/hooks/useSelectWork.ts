import { useCallback, useState } from "react";

import { Work } from "../types/work";

type Props = {
  id: number;
  works: Array<Work>;
  onOpen: () => void;
};

export const useSelectWork = () => {
  const [selectedWork, setSelectWork] = useState<Work>({} as Work);

  const onSelectWork = useCallback((props: Props) => {
    const { id, works, onOpen } = props;

    const targetWork = works.find((work) => work.id === id);
    setSelectWork(targetWork as Work);
    onOpen();
  }, []);

  return { selectedWork, onSelectWork };
};
