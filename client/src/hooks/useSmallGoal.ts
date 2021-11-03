import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

import { SmallGoal } from "../types/smallGoal";
import { useShowMessage } from "./useShowMessage";
import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { useFormatCamel } from "./useFormatCamel";

export type InitialValuesType = {
  smallGoalName: string;
  created: string;
};

type OnSubmitProps = {
  values: InitialValuesType;
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
    axios
      .get<any[]>(`http://localhost:4000/fetch/smallgoals/${workId}`)
      .then((res) => {
        setWorkName(res.data[0].work_name);

        const newIncompletedSmallGoals: SmallGoal[] = [];
        const newCompletedSmallGoals: SmallGoal[] = [];
        let totalTime = 0;
        res.data.map((smallGoal) => {
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
  }, []);

  const onSubmit = useCallback(
    (values: InitialValuesType) => {
      axios
        .post(`http://localhost:4000/post/smallgoal/${workId}`, values)
        .then((res) => {
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
    [incompletedSmallGoals]
  );

  const deleteFromIncompletedState = useCallback(
    (index: number) => {
      const newSmallGoal = [...incompletedSmallGoals];
      newSmallGoal.splice(index, 1);
      setIncompletedSmallGoals(newSmallGoal);
    },
    [incompletedSmallGoals]
  );

  const onClickDelete = useCallback(
    (id: number, index: number) => {
      axios
        .delete("http://localhost:4000/delete/smallgoal", { data: { id } })
        .then((res) => {
          deleteFromIncompletedState(index);
        });
    },
    [incompletedSmallGoals]
  );

  const onClickComplete = useCallback(
    (id: number, index: number) => {
      axios
        .put("http://localhost:4000/update/smallgoal/completed", {
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
    [incompletedSmallGoals, completedSmallGoals]
  );

  const onClickBack = useCallback(
    (id: number, index: number) => {
      axios
        .put("http://localhost:4000/update/smallgoal/completed", {
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
    [incompletedSmallGoals, completedSmallGoals]
  );

  const onClickUpdate = useCallback(
    (props: SmallGoalUpdateProps) => {
      const { values, smallGoalId } = props;
      axios
        .put(`http://localhost:4000/update/smallgoal/${workId}`, {
          smallGoalId,
          ...values,
        })
        .then((res) => {
          const formatedList = snakeToCamel(res.data, "smallGoal");
          const smallGoalList = formatedList as SmallGoal[];
          const incompleteList: SmallGoal[] = [];
          smallGoalList.map((smallGoal) => {
            if (!smallGoal.completed) {
              incompleteList.push(smallGoal);
            }
          });
          setIncompletedSmallGoals(incompleteList);
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    [workId]
  );

  const smallGoalValidationSchema = Yup.object({
    smallGoalName: Yup.string().required("入力必須です"),
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
