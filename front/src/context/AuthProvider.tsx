import { createContext, ReactNode, useState } from "react";
import { AuthType } from "../types/user.types";

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextType = {
  auth: AuthType | null,
  setAuth: (auth: AuthType | null) => void,
  persist: boolean,
  setPersist: (persist: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthType | null>(null);
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") || "false")
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
