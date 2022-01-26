import { useEffect, useState } from "react";
import { axios } from "../apis/axios";
import { User } from "../types/user";
import { useFormatCamel } from "./useFormatCamel";

export const useCheered = (userId: number) => {
  const [listCheered, setListCheered] = useState<User[]>([]);
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios
      .get(`/fetch/cheered/${userId}`)
      .then((res) => {
        const formatedList = snakeToCamel(res.data, "user");
        const users = formatedList as User[];

        setListCheered(users);
      })
      .catch((err) => {
        if (err) throw err;
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { listCheered };
};
