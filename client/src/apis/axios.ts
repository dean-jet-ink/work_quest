import baseAxios from "axios";

const url =
  process.env.REACT_APP_SWITCH === "1"
    ? "http://localhost:4000"
    : "http://work-quest.com:4000";

export const axios = baseAxios.create({
  baseURL: url,
});

// cookieの通信を設定
axios.defaults.withCredentials = true;
