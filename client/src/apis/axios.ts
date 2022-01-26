import baseAxios from "axios";

export const axios = baseAxios.create({
  baseURL: process.env.REACT_APP_URL,
});

// cookieの通信を設定
axios.defaults.withCredentials = true;
