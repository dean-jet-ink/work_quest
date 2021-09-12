import axios from "axios";
import { FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useCallback } from "react";
import * as Yup from "yup";
import md5 from "js-md5";

import { User } from "../../types/user";
import { useShowMessage } from "../useShowMessage";

type InitialValuesType = {
  picture: File | null;
  name: string;
  mail: string;
  comment: string;
  userId: number;
};

type OnSubmitProps = {
  values: InitialValuesType;
  actions: FormikHelpers<InitialValuesType>;
};

export const useProfile = (
  user: User,
  setUser: Dispatch<SetStateAction<User>>
) => {
  const initialValues: InitialValuesType = {
    userId: user.user_id,
    picture: null,
    name: user.user_name,
    mail: user.mail,
    comment: user.comment,
  };
  const { showMessage } = useShowMessage();

  const onSubmit: (props: OnSubmitProps) => void = useCallback((props) => {
    const { values, actions } = props;
    const { userId, picture, name, mail, comment } = values;
    const fileName = picture?.name.split(".")[0];
    const extension = picture?.name.split(".").splice(-1, 1);
    const hash = md5(fileName as string);
    const hashName = picture ? `${hash}.${extension}` : null;

    axios
      .put(`http://localhost:4000/update/profile/${userId}`, {
        picture: hashName,
        name,
        mail,
        comment,
      })
      .then((res) => {
        setTimeout(() => {
          showMessage({
            description: "プロフィールを変更しました",
            status: "success",
          });
          setUser(res.data);
          actions.setSubmitting(false);
        }, 500);
      })
      .catch((err) => {
        showMessage({
          description: "プロフィールの変更に失敗しました",
          status: "error",
        });
        actions.setSubmitting(false);
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("入力必須です"),
    mail: Yup.string()
      .email("メールアドレスが正しくありません")
      .required("*入力必須です")
      .test(
        "validateDuplicatedMail",
        "このメールアドレスは既に登録されています",
        (value): Promise<boolean> => {
          const validation = axios
            .get(
              `http://localhost:4000/get/validation/mail/duplicated/${value}`
            )
            .then((res) => {
              // メールアドレスが重複している、かつ元の値と異なればfalse
              if (res.data.duplicate) {
                if (res.data.duplicate.mail === user.mail) {
                  return true;
                } else {
                  return false;
                }
              } else {
                return true;
              }
            });
          return validation;
        }
      ),
  });

  return { initialValues, onSubmit, validationSchema };
};
