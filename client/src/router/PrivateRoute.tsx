import { memo, useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
// import { axios } from "../apis/axios";

// import { useLoginUser } from "../hooks/useLoginUser";

export const PrivateRoute = memo((props: RouteProps & { key: number }) => {
  // const { setLoginUserId } = useLoginUser();

  // useEffect(() => {
  //   axios.get<{ userId: number }>("/auth").then((res) => {
  //     setLoginUserId(res.data.userId);
  //   });
  // }, []);

  // cookie authの値("true")を真偽値に変換するための関数
  const toBoolean = (data: string) => {
    return data === "true";
  };

  // cookieの値 auth=true
  const authUser = toBoolean(document.cookie.split("=")[1]);

  if (authUser) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
});
