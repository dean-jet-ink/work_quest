import { useCallback, useState } from "react";
import { SmallGoal } from "../types/smallGoal";

type Props = {
  id: number;
  smallGoals: Array<SmallGoal>;
  onOpen: () => void;
};

export const useSelectSmallGoal = () => {
  const [selectedSmallGoal, setSelectedSmallGoal] = useState<SmallGoal>(
    {} as SmallGoal
  );

  const onSelectSmallGoal = useCallback((props: Props) => {
    const { id, smallGoals, onOpen } = props;

    const targetSmallGoal = smallGoals.find((smallGoal) => smallGoal.id === id);
    setSelectedSmallGoal(targetSmallGoal as SmallGoal);
    onOpen();
  }, []);

  return { selectedSmallGoal, onSelectSmallGoal };
};
