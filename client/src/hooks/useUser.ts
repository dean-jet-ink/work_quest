import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FormikHelpers } from "formik";
import * as Yup from "yup";

import { User } from "../types/user";
import { useFileStringify } from "./useFileStringify";
import { useShowMessage } from "./useShowMessage";

export type UserInitialValuesType = {
  picture: File | string | null;
  name: string;
  mail: string;
  sex: string;
  comment: string;
  userId: number;
};

export type UserOnSubmitProps = {
  values: UserInitialValuesType;
  actions: FormikHelpers<UserInitialValuesType>;
};

export const useUser = (userId: number) => {
  const [user, setUser] = useState<User>({} as User);
  const { showMessage } = useShowMessage();
  const { fileToString } = useFileStringify();

  const snakeToCamel = useCallback((item: any) => {
    const formatedItem = {
      userId: item.user_id,
      userName: item.user_name,
      mail: item.mail,
      picture: item.picture,
      sex: item.sex,
      comment: item.comment,
      totalTime: item.total_time,
      title: item.title,
      whiteNoise: item.white_noise,
      level: item.level,
    };
    return formatedItem;
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch/user/${userId}`)
      .then((res) => {
        const user = snakeToCamel(res.data);
        setUser(user);
      })
      .catch((err) => {
        showMessage({
          description: "ユーザーの取得に失敗しました",
          status: "error",
        });
        throw err;
      });
  }, [userId]);

  const userInitialValues: UserInitialValuesType = {
    userId: user.userId,
    picture: user.picture,
    name: user.userName,
    mail: user.mail,
    sex: user.sex,
    comment: user.comment,
  };

  const userOnSubmit = useCallback((props: UserOnSubmitProps) => {
    const { values, actions } = props;
    const { userId, picture, name, mail, sex, comment } = values;

    axios
      .put(`http://localhost:4000/update/profile/${userId}`, {
        picture: picture instanceof File ? fileToString(picture) : picture,
        name,
        mail,
        sex,
        comment,
      })
      .then((res) => {
        const formatedUser = snakeToCamel(res.data);
        setUser(formatedUser);

        showMessage({
          description: "プロフィールを変更しました",
          status: "success",
        });

        actions.setSubmitting(false);
      })
      .catch((err) => {
        showMessage({
          description: "プロフィールの変更に失敗しました",
          status: "error",
        });
        actions.setSubmitting(false);
      });
  }, []);

  const userValidationSchema = Yup.object({
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

  return { user, userInitialValues, userOnSubmit, userValidationSchema };
};
