import { useHistory } from "react-router-dom";
import { axios } from "../apis/axios";

import { useShowMessage } from "./useShowMessage";

export const useLogout = () => {
  const history = useHistory();
  const { showMessage } = useShowMessage();

  const logout = () => {
    axios
      .get("/logout")
      .then((res) => {
        history.push("/");
        showMessage({
          description: "ログアウトしました",
          status: "info",
        });
      })
      .catch((err) => {
        throw err;
      });
  };

  return { logout };
};
