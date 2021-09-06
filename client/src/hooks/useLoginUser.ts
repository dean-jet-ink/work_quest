import { useContext } from "react";
import {
  LoginUserContext,
  LoginUserContextType,
} from "../providers/LoginUserContext";

export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
