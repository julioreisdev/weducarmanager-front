import React, { createContext, useState, ReactNode, useEffect } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedLogin = localStorage.getItem("weducar_login");
    return storedLogin === "true";
  });

  useEffect(() => {
    localStorage.setItem("weducar_login", String(isAuthenticated));
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
