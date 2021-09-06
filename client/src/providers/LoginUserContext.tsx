import {
  Dispatch,
  SetStateAction,
  createContext,
  ReactNode,
  useState,
} from "react";

export type LoginUserContextType = {
  loginUserId: number | null;
  setLoginUserId: Dispatch<SetStateAction<number | null>>;
};

export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUserId, setLoginUserId] = useState<number | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUserId, setLoginUserId }}>
      {children}
    </LoginUserContext.Provider>
  );
};
