import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/user";
import { useFormatCamel } from "./useFormatCamel";
import { useShowMessage } from "./useShowMessage";

export const useFetchUser = (userId: number) => {
  const [user, setUser] = useState<User>({} as User);
  const { showMessage } = useShowMessage();

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
        console.log(user);
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

  return { user, setUser };
};
