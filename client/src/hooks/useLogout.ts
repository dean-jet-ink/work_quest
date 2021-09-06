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
        console.log(res.data);
        showMessage({
          description: "ログアウトしました",
          status: "info",
        });
        history.push("/");
      })
      .catch((err) => {
        throw err;
      });
  };

  return { logout };
};
