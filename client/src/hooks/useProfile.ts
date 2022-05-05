import { FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useCallback } from "react";
import * as Yup from "yup";

import { axios } from "../apis/axios";
import { User } from "../types/user";
import { useFileStringify } from "./useFileStringify";
import { useShowMessage } from "./useShowMessage";

type InitialValuesType = {
  picture: File | string | null;
  name: string;
  mail: string;
  sex: string;
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
    userId: user.userId,
    picture: user.picture,
    name: user.userName,
    mail: user.mail,
    sex: user.sex,
    comment: user.comment,
  };
  const { showMessage } = useShowMessage();
  const { fileToString } = useFileStringify();

  const onSubmit: (props: OnSubmitProps) => void = useCallback((props) => {
    const { values, actions } = props;
    const { userId, picture, name, mail, sex, comment } = values;

    axios
      .put(`/update/profile/${userId}`, {
        picture: picture instanceof File ? fileToString(picture) : picture,
        name,
        mail,
        sex,
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
        throw err;
      });
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().max(10, "*10文字以内です").required("*入力必須です"),
    mail: Yup.string()
      .email("*メールアドレスが正しくありません")
      .required("*入力必須です")
      .test(
        "validateDuplicatedMail",
        "*このメールアドレスは既に登録されています",
        (value): Promise<boolean> => {
          const validation = axios
            .get(`/get/validation/mail/duplicated/${value}`)
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
    comment: Yup.string().max(40, "*40文字以内です"),
  });

  return { initialValues, onSubmit, validationSchema };
};
