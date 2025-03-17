import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Session, SessionBody } from "../types/session.types";

const SESSION_URL = "/session";

interface SessionServiceInterface {
  createSession: (sessionData: SessionBody) => Promise<Session>,
  editSession: (
    sessionId: string,
    sessionData: SessionBody
  ) => Promise<Session>,
  deleteSession: (sessionId: string) => Promise<Session>,
  getSessionAndSets: (sessionId: string) => Promise<Session>
} 

const useSessionService = (): SessionServiceInterface => {
  const axiosPrivate = useAxiosPrivate();

  const createSession = async (sessionData: SessionBody): Promise<Session> => {
    try {
      const response = await axiosPrivate.post(
        SESSION_URL,
        JSON.stringify(sessionData)
      )
      return response.data;
    } catch (err) {
      console.error("Error creating session:", err);
      throw err;
    }
  }

  const editSession = async (
    sessionId: string,
    sessionData: SessionBody
  ): Promise<Session> => {
    try {
      const response = await axiosPrivate.put(
        `${SESSION_URL}/${sessionId}`,
        JSON.stringify(sessionData)
      )
      return response.data;
    } catch (err) {
      console.error("Error saving session:", err);
      throw err;
    }
  }

  const deleteSession = async (sessionId: string): Promise<Session> => {
    try {
      const response = await axiosPrivate.delete(
        `${SESSION_URL}/${sessionId}`,
      )
      return response.data;
    } catch (err) {
      console.error("Error deleting session:", err);
      throw err;
    }
  }

  const getSessionAndSets = async (sessionId: string): Promise<Session> => {
    try {
      const response = await axiosPrivate.get(
        `${SESSION_URL}/${sessionId}/sets`
      )
      return response.data;
    } catch (err) {
      console.error("Error fetching session:", err);
      throw err;
    }
  }

  return {
    createSession,
    editSession,
    deleteSession,
    getSessionAndSets
  }
}

export default useSessionService;