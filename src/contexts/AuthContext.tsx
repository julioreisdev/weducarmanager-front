import React, { createContext, useState, ReactNode, useEffect } from "react";
import { IUserInfo } from "../interfaces/user.interface";

interface IAuthContext {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setUserInfo: (data: IUserInfo) => void;
  userInfo: IUserInfo | undefined;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedLogin = localStorage.getItem("weducar_login");
    return storedLogin === "true";
  });
  const [userInfo, setUserInfo] = useState<IUserInfo>();

  useEffect(() => {
    localStorage.setItem("weducar_login", String(isAuthenticated));
  }, [isAuthenticated]);

  const setUserInfoData = (data: IUserInfo) => {
    setUserInfo(data);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setUserInfo: setUserInfoData,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
