import { useContext } from "react"
import SessionContext from "../context/SessionProvider"

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useExercise must be used within an SessionProvider");
  } 
  return context;
}

export default useSession;