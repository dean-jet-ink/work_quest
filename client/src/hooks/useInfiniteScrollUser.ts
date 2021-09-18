import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { User } from "../types/user";
import { useShowMessage } from "./useShowMessage";

export const useInfiniteScrollUser = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { showMessage } = useShowMessage();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch/userlist/20`)
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
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
  }, []);

  const loadMoreUser = useCallback((page: number) => {
    const limit = page * 20;

    axios
      .get<any[]>(`http://localhost:4000/fetch/userlist/${limit}`)
      .then((res) => {
        console.log(res.data);
        setUserList(res.data);
        if (limit > res.data.length) {
          setHasMore(false);
        }
      });
  }, []);

  return { userList, hasMore, loadMoreUser };
};
