import { useCallback, useEffect, useState } from "react";
import { axios } from "../apis/axios";
import { User } from "../types/user";
import { useFormatCamel } from "./useFormatCamel";
import { useShowMessage } from "./useShowMessage";

export const useCheer = (
  userId: number,
  targetId?: number,
  userName?: string
) => {
  const [cheerings, setCheerings] = useState<User[]>([]); //応援しているユーザーの一覧
  const [cheered, setCheered] = useState(false); //応援しているかの真偽
  const [prosessing, setProsessing] = useState(false); //処理中の表示
  const { snakeToCamel } = useFormatCamel();
  const { showMessage } = useShowMessage();

  useEffect(() => {
    axios
      .get<any[]>(`/fetch/cheer/${userId}`)
      .then((res) => {
        const formatedList = snakeToCamel(res.data, "user");
        const users = formatedList as User[];
        setCheerings(users);
        if (targetId && users) {
          const exist = users.find((user) => user.userId === targetId);
          exist ? setCheered(true) : setCheered(false);
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, targetId]);

  const onClickSubmit = useCallback(() => {
    setProsessing(true); //処理中スピン表示

    axios
      .post(`/post/cheer`, { userId, targetId })
      .then(() => {
        setCheered(true);
        showMessage({
          description: `${userName}さんを応援しました`,
          status: "success",
        });
      })
      .catch((err) => {
        if (err) throw err;
      })
      .finally(() => {
        setProsessing(false);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, targetId, userName]);

  const onClickDelete = useCallback(() => {
    setProsessing(true);

    axios
      .delete("/delete/cheer", {
        data: { targetId, userId },
      })
      .then(() => {
        setCheered(false);
      })
      .catch((err) => {
        if (err) throw err;
      })
      .finally(() => {
        setProsessing(false);
      });
  }, [userId, targetId]);

  return { cheerings, cheered, prosessing, onClickSubmit, onClickDelete };
};
