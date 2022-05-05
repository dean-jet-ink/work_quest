import { useCallback, useEffect, useState } from "react";

import { axios } from "../apis/axios";
import { User } from "../types/user";
import { useFormatCamel } from "./useFormatCamel";
import { useShowMessage } from "./useShowMessage";

export const useInfiniteScrollUser = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { showMessage } = useShowMessage();
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios
      .get(`/fetch/userlist/20`)
      .then((res) => {
        const users = snakeToCamel(res.data, "user");
        setUserList(users as User[]);
        if (20 > res.data.length) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        showMessage({
          description: "ユーザーの取得に失敗しました",
          status: "error",
        });
        throw err;
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreUser = useCallback((page: number) => {
    const limit = page * 20;

    axios.get<any[]>(`/fetch/userlist/${limit}`).then((res) => {
      const users = snakeToCamel(res.data, "user");
      setUserList(users as User[]);

      if (limit > res.data.length) {
        setHasMore(false);
      }
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { userList, hasMore, loadMoreUser };
};
