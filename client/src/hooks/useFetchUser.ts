import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useShowMessage } from "./useShowMessage";

export const useFetchUser = (userId: number) => {
  const [user, setUser] = useState<User>({} as User);
  const { showMessage } = useShowMessage();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch/user/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        showMessage({
          description: "ユーザーの取得に失敗しました",
          status: "error",
        });
        throw err;
      });
  }, [userId]);

  return [user];
};
