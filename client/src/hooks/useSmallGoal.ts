import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import * as Yup from "yup";

import { SmallGoal } from "../types/smallGoal";
import { useShowMessage } from "./useShowMessage";
import { useFormatCamel } from "./useFormatCamel";
import { axios } from "../apis/axios";

export type InitialValuesType = {
  smallGoalName: string;
  created: string;
};

export type SmallGoalUpdateProps = {
  values: {
    smallGoalName: string;
  };
  smallGoalId: number;
};

export const useSmallGoal = (workId: number) => {
  const [workName, setWorkName] = useState("");
  const [workTotalTime, setWorkTotalTime] = useState(0);
  const [incompletedSmallGoals, setIncompletedSmallGoals] = useState<
    SmallGoal[]
  >([]);
  const [completedSmallGoals, setCompletedSmallGoals] = useState<SmallGoal[]>(
    []
  );
  const { showMessage } = useShowMessage();
  const { snakeToCamel } = useFormatCamel();
  const now = moment();
  const initialValues: InitialValuesType = {
    smallGoalName: "",
    created: now.format("YYYY-MM-DD HH:mm:ss"),
  };

  useEffect(() => {
    axios.get<any[]>(`/fetch/smallgoals/${workId}`).then((res) => {
      setWorkName(res.data[0].work_name);

      const newIncompletedSmallGoals: SmallGoal[] = [];
      const newCompletedSmallGoals: SmallGoal[] = [];
      let totalTime = 0;
      res.data.forEach((smallGoal) => {
        if (smallGoal.small_goal_id) {
          totalTime += smallGoal.total_time;

          const newSmallGoal = {
            id: smallGoal.small_goal_id,
            smallGoalName: smallGoal.small_goal_name,
            completed: smallGoal.completed,
            totalTime: smallGoal.total_time,
          };

          if (newSmallGoal.completed) {
            newCompletedSmallGoals.push(newSmallGoal);
          } else {
            newIncompletedSmallGoals.push(newSmallGoal);
          }
        }
      });

      setWorkTotalTime(totalTime);
      setCompletedSmallGoals(newCompletedSmallGoals);
      setIncompletedSmallGoals(newIncompletedSmallGoals);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = useCallback(
    (values: InitialValuesType) => {
      axios.post(`/post/smallgoal/${workId}`, values).then((res) => {
        showMessage({
          description: `${values.smallGoalName}を追加しました`,
          status: "success",
        });
        const newSmallGoal = {
          id: res.data.slice(-1)[0].small_goal_id,
          smallGoalName: res.data.slice(-1)[0].small_goal_name,
          completed: res.data.slice(-1)[0].completed,
          totalTime: res.data.slice(-1)[0].total_time,
        };
        const newSmallGoals = [...incompletedSmallGoals, newSmallGoal];
        setIncompletedSmallGoals(newSmallGoals);
      });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [incompletedSmallGoals]
  );

  const deleteFromIncompletedState = useCallback(
    (index: number) => {
      const newSmallGoal = [...incompletedSmallGoals];
      newSmallGoal.splice(index, 1);
      setIncompletedSmallGoals(newSmallGoal);
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [incompletedSmallGoals]
  );

  const onClickDelete = useCallback(
    (id: number, index: number) => {
      axios.delete("/delete/smallgoal", { data: { id } }).then((res) => {
        deleteFromIncompletedState(index);
      });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [incompletedSmallGoals]
  );

  const onClickComplete = useCallback(
    (id: number, index: number) => {
      axios
        .put("/update/smallgoal/completed", {
          id,
          completed: true,
        })
        .then((res) => {
          deleteFromIncompletedState(index);
          const newSmallGoal = [
            ...completedSmallGoals,
            incompletedSmallGoals[index],
          ];
          setCompletedSmallGoals(newSmallGoal);
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [incompletedSmallGoals, completedSmallGoals]
  );

  const onClickBack = useCallback(
    (id: number, index: number) => {
      axios
        .put("/update/smallgoal/completed", {
          id,
          completed: false,
        })
        .then((res) => {
          const newCompleteWorks = [...completedSmallGoals];
          newCompleteWorks.splice(index, 1);
          setCompletedSmallGoals(newCompleteWorks);

          const newWorks = [
            ...incompletedSmallGoals,
            completedSmallGoals[index],
          ];
          setIncompletedSmallGoals(newWorks);
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [incompletedSmallGoals, completedSmallGoals]
  );

  const onClickUpdate = useCallback(
    async (props: SmallGoalUpdateProps) => {
      const { values, smallGoalId } = props;
      await axios
        .put(`/update/smallgoal/${workId}`, {
          smallGoalId,
          ...values,
        })
        .then((res) => {
          const formatedList = snakeToCamel(res.data, "smallGoal");
          const smallGoalList = formatedList as SmallGoal[];
          const incompleteList: SmallGoal[] = [];
          smallGoalList.forEach((smallGoal) => {
            if (!smallGoal.completed) {
              incompleteList.push(smallGoal);
            }
          });
          setIncompletedSmallGoals(incompleteList);
        })
        .catch((err) => {
          throw err;
        });
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [workId]
  );

  const smallGoalValidationSchema = Yup.object({
    smallGoalName: Yup.string()
      .max(20, "*20文字以内です")
      .required("入力必須です"),
  });

  return {
    initialValues,
    workName,
    workTotalTime,
    incompletedSmallGoals,
    completedSmallGoals,
    setIncompletedSmallGoals,
    onSubmit,
    onClickDelete,
    onClickComplete,
    onClickBack,
    onClickUpdate,
    smallGoalValidationSchema,
  };
};
