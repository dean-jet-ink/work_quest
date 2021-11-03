import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FormikHelpers } from "formik";
import moment from "moment";
import * as Yup from "yup";

import { Work } from "../types/work";
import { useShowMessage } from "./useShowMessage";
import { useFormatCamel } from "../hooks/useFormatCamel";

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
export type WorkUpdateProps = {
  values: {
    workName: string;
    deadline: string | null;
  };
  actions: FormikHelpers<{ workName: string; deadline: string | null }>;
  workId: number;
};

export const useWorks = (userId: number) => {
  const [incompleteWorks, setIncompleteWorks] = useState<Array<Work>>([]);
  const [completeWorks, setCompletedWorks] = useState<Array<Work>>([]);
  const { showMessage } = useShowMessage();
  const { snakeToCamel } = useFormatCamel();
  const now = moment();
  const workInitialValues: WorkInitialValuesType = {
    workName: "",
    created: now.format("YYYY-MM-DD HH:mm:ss"),
    deadline: null,
  };

  useEffect(() => {
    axios
      .get<Array<any>>(`http://localhost:4000/fetch/works/${userId}`)
      .then((res) => {
        const newIncompleteWorks: Work[] = [];
        const newCompleteWorks: Work[] = [];
        const formatedList = snakeToCamel(res.data, "work");
        const workList = formatedList as Work[];
        workList.map((work) => {
          if (work.completed) {
            newCompleteWorks.push(work);
          } else {
            newIncompleteWorks.push(work);
          }
        });

        setIncompleteWorks(newIncompleteWorks);
        setCompletedWorks(newCompleteWorks);
      });
  }, [userId]);

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
        .then(() => {
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

  const onClickUpdate = useCallback(
    (props: WorkUpdateProps) => {
      const { values, actions, workId } = props;
      axios
        .put(`http://localhost:4000/update/work/${userId}`, {
          workId,
          ...values,
        })
        .then((res) => {
          const formatedList = snakeToCamel(res.data, "work");
          const workList = formatedList as Work[];
          const incompleteList: Work[] = [];
          workList.map((work) => {
            if (!work.completed) {
              incompleteList.push(work);
            }
          });
          setIncompleteWorks(incompleteList);
          actions.setSubmitting(false);
        })
        .catch((err) => {
          if (err) throw err;
        });
    },
    [userId]
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
    onClickUpdate,
    workValidationSchema,
  };
};
