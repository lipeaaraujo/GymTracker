import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const SessionContext = createContext({});

export const SessionProvider = () => {
  const [curSession, setCurSession] = useState({});

  return (
    <SessionContext.Provider value={{ curSession, setCurSession }}>
      <Outlet />
    </SessionContext.Provider>
  );
};

export default SessionContext;
