import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FormikHelpers } from "formik";
import moment from "moment";
import * as Yup from "yup";

import { Work } from "../types/work";
import { useShowMessage } from "./useShowMessage";

// topページからmodalへpropsとして渡すため,そこでの型定義のためにexport
export type WorkInitialValuesType = {
  workName: string;
  created: string;
  deadline: string | null;
};
export type WorkOnSubmitProps = {
  values: WorkInitialValuesType;
  actions: FormikHelpers<WorkInitialValuesType>;
};

export const useWorks = (userId: number) => {
  const [incompleteWorks, setIncompleteWorks] = useState<Array<Work>>([]);
  const [completeWorks, setCompletedWorks] = useState<Array<Work>>([]);
  const { showMessage } = useShowMessage();

  useEffect(() => {
    axios
      .get<Array<any>>(`http://localhost:4000/fetch/works/${userId}`)
      .then((res) => {
        const newIncompleteWorks: Array<Work> = [];
        const newCompleteWorks: Array<Work> = [];
        res.data.map((work) => {
          const newWork = {
            id: work.work_id,
            workName: work.work_name,
            completed: work.completed,
            deadline: work.deadline,
            totalTime: work.total_time,
          };
          if (newWork.completed) {
            newCompleteWorks.push(newWork);
          } else {
            newIncompleteWorks.push(newWork);
          }
        });

        setIncompleteWorks(newIncompleteWorks);
        setCompletedWorks(newCompleteWorks);
      });
  }, [userId]);

  const now = moment();

  const workInitialValues: WorkInitialValuesType = {
    workName: "",
    created: now.format("YYYY-MM-DD HH:mm:ss"),
    deadline: null,
  };

  const onSubmit = useCallback(
    (props: WorkOnSubmitProps) => {
      const { values, actions } = props;

      axios
        .post(`http://localhost:4000/post/work/${userId}`, values)
        .then((res) => {
          showMessage({
            description: `${values.workName}を追加しました`,
            status: "success",
          });
          const newWork = {
            id: res.data.slice(-1)[0].work_id,
            workName: res.data.slice(-1)[0].work_name,
            completed: res.data.slice(-1)[0].completed,
            deadline: res.data.slice(-1)[0].deadline,
            totalTime: res.data.slice(-1)[0].total_time,
          };
          const newWorks = [...incompleteWorks, newWork];
          setIncompleteWorks(newWorks);
          actions.setSubmitting(false);
        })
        .catch((err) => {
          if (err) throw err;
          actions.setSubmitting(false);
        });
    },
    [incompleteWorks, userId]
  );

  const deleteFromIncompleteState = useCallback(
    (index: number) => {
      const newWorks = [...incompleteWorks];
      newWorks.splice(index, 1);
      setIncompleteWorks(newWorks);
    },
    [incompleteWorks]
  );

  const onClickDelete = useCallback(
    (id: number, index: number) => {
      axios
        .delete("http://localhost:4000/delete/work", { data: { id } })
        .then((res) => {
          deleteFromIncompleteState(index);
        });
    },
    [incompleteWorks]
  );

  const onClickComplete = useCallback(
    (id: number, index: number) => {
      axios
        .put("http://localhost:4000/update/work/completed", {
          id,
          completed: true,
        })
        .then((res) => {
          deleteFromIncompleteState(index);

          const newWorks = [...completeWorks, incompleteWorks[index]];
          setCompletedWorks(newWorks);
        });
    },
    [incompleteWorks, completeWorks]
  );

  const onClickBack = useCallback(
    (id: number, index: number) => {
      axios
        .put("http://localhost:4000/update/work/completed", {
          id,
          completed: false,
        })
        .then((res) => {
          const newCompleteWorks = [...completeWorks];
          newCompleteWorks.splice(index, 1);
          setCompletedWorks(newCompleteWorks);

          const newIncompleteWorks = [...incompleteWorks, completeWorks[index]];
          setIncompleteWorks(newIncompleteWorks);
        });
    },
    [incompleteWorks, completeWorks]
  );

  const workValidationSchema = Yup.object({
    workName: Yup.string().required("入力必須です"),
  });

  return {
    workInitialValues,
    incompleteWorks,
    completeWorks,
    setIncompleteWorks,
    onSubmit,
    onClickDelete,
    onClickComplete,
    onClickBack,
    workValidationSchema,
  };
};
