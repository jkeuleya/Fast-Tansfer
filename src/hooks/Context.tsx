import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { ContextType, UserProps } from "../types/types";
import { getLoginData, getToken, removeTokens } from "./AsyncStorage";

const MyContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<UserProps | null>(null);

  async function getUser() {
    const token = await getToken();
    const status = await getLoginData();
    if (token !== null && status !== null) {
      setUser({
        token: token.token,
        //@ts-ignore
        status: status.status,
      });
    }
  }
  if (user === null || user === undefined) {
    getUser();
  }

  console.log(
    "🚀 ~ file: Context.tsx ~ line 44 ~ ContextProvider ~ token",
    user
  );

  return (
    <MyContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const usecontext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
