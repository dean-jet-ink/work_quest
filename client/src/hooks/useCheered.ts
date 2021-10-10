import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import { useFormatCamel } from "./useFormatCamel";

export const useCheered = (userId: number) => {
  const [listCheered, setListCheered] = useState<User[]>([]);
  const { snakeToCamel } = useFormatCamel();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/fetch/cheered/${userId}`)
      .then((res) => {
        const formatedList = snakeToCamel(res.data, "user");
        const users = formatedList as User[];

        setListCheered(users);
      })
      .catch((err) => {
        if (err) throw err;
      });
  }, [userId]);

  return { listCheered };
};
