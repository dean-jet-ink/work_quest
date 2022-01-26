import { FormikHelpers } from "formik";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { axios } from "../../apis/axios";

import { useLoginUser } from "../useLoginUser";
import { useShowMessage } from "../useShowMessage";

type InitialValuesType = {
  mail: string;
  pass: string;
};

type OnSubmitProps = {
  values: InitialValuesType;
  actions: FormikHelpers<InitialValuesType>;
};

export const useLogin = () => {
  const initialValues: InitialValuesType = {
    mail: "",
    pass: "",
  };
  const history = useHistory();
  const { showMessage } = useShowMessage();
  const { setLoginUserId } = useLoginUser();

  const onSubmit: (props: OnSubmitProps) => void = useCallback((props) => {
    const { values, actions } = props;

    axios
      .post(`/login`, values)
      .then((res) => {
        if (res.data.err) {
          showMessage({
            description: "メールアドレスまたはパスワードが違います",
            status: "error",
          });
          actions.setSubmitting(false);
        } else {
          setTimeout(() => {
            showMessage({
              description: "ログインに成功しました",
              status: "success",
            });
            setLoginUserId(res.data.userId);
            actions.setSubmitting(false);
            history.push("/top");
          }, 500);
        }
      })
      .catch((err) => {
        showMessage({
          description: `ログインに失敗しました`,
          status: "error",
        });
        actions.setSubmitting(false);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = Yup.object({
    mail: Yup.string()
      .email("*メールアドレスが正しくありません")
      .required("*入力必須です"),
    pass: Yup.string().required("*入力必須です"),
  });

  return { initialValues, onSubmit, validationSchema };
};
