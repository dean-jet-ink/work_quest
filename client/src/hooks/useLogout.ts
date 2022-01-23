import axios from "axios";
import { useHistory } from "react-router-dom";

import { useShowMessage } from "./useShowMessage";

export const useLogout = () => {
  axios.defaults.withCredentials = true;
  const history = useHistory();
  const { showMessage } = useShowMessage();

  const logout = () => {
    axios
      .get("http://localhost:4000/logout")
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
