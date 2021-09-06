import axios from "axios";
import { memo, ReactNode, useEffect } from "react";
import { useLoginUser } from "../hooks/useLoginUser";

export const AuthProvider = memo((props: { children: ReactNode }) => {
  const { children } = props;

  const { setLoginUserId } = useLoginUser();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get<{ userId: number }>("http://localhost:4000/auth").then((res) => {
      setLoginUserId(res.data.userId);
    });
  }, []);

  return <>{children}</>;
});
