import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import { Session } from "../types/session.types";

type SessionContextType = {
  curSession: Session | null,
  setCurSession: Dispatch<SetStateAction<Session | null>>
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider = () => {
  const [curSession, setCurSession] = useState<Session | null>(null);

  return (
    <SessionContext.Provider value={{ curSession, setCurSession }}>
      <Outlet />
    </SessionContext.Provider>
  );
};

export default SessionContext;
