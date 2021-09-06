import { memo } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import axios from "axios";

import { useLoginUser } from "../hooks/useLoginUser";

export const PrivateRoute = memo((props: RouteProps & { key: number }) => {
  const { setLoginUserId } = useLoginUser();

  axios.defaults.withCredentials = true;
  axios.get<{ userId: number }>("http://localhost:4000/auth").then((res) => {
    setLoginUserId(res.data.userId);
    return res.data.userId;
  });

  // cookie authの値("true")を真偽値に変換するための関数
  const toBoolean = (data: string) => {
    return data === "true";
  };

  const authUser = toBoolean(document.cookie.split("=")[1]);

  if (authUser) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
});
