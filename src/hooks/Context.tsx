import React, { ReactNode, createContext, useContext } from "react";
import { ContextType, UserProps } from "../types/types";
import { getLoginData, getToken } from "./AsyncStorage";

const MyContext = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<UserProps | null>(null);

  const [showWebView, setShowWebView] = React.useState(false);

  async function getUser() {
    const status = await getLoginData();
    //@ts-ignore
    if (status.token !== null && status?.status !== null) {
      setUser({
        //@ts-ignore
        token: status.token,
        //@ts-ignore
        status: status.status,
      });
      console.log(
        status?.token,
        status?.status,
        "saving user getting from async storage"
      );
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
        showWebView,
        setShowWebView,
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
