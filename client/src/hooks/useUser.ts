import { useCallback, useEffect, useState } from "react";
import { FormikHelpers } from "formik";
import * as Yup from "yup";

import { User } from "../types/user";
import { useShowMessage } from "./useShowMessage";
import { axios } from "../apis/axios";

export type UserInitialValuesType = {
  picture: string | null;
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

  const snakeToCamel = useCallback((item: any) => {
    const formatedItem: User = {
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
    const fetchData = async () => {
      const result = await axios
        .get(`/fetch/user/${userId}`)
        .then((res) => {
          const user = snakeToCamel(res.data);
          return user;
        })
        .catch((err) => {
          showMessage({
            description: "ユーザーの取得に失敗しました",
            status: "error",
          });
          throw err;
        });
      setUser(result);
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
      .put(`/update/profile/${userId}`, {
        picture,
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userValidationSchema = Yup.object({
    name: Yup.string().max(20, "20文字以内です").required("*入力必須です"),
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
  });

  return {
    user,
    userInitialValues,
    userOnSubmit,
    userValidationSchema,
  };
};
