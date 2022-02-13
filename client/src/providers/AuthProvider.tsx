import { memo, ReactNode, useEffect } from "react";

import { axios } from "../apis/axios";
import { useLoginUser } from "../hooks/useLoginUser";

export const AuthProvider = memo((props: { children: ReactNode }) => {
  const { children } = props;

  const { setLoginUserId } = useLoginUser();

  useEffect(() => {
    axios.get<{ userId: number }>("/auth").then((res) => {
      setLoginUserId(res.data.userId);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
});
