import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Set, SetBody } from "../types/set.types";

const SET_URL = "/set";

interface SetServiceInterface {
  createSet: (setData: SetBody) => Promise<Set>,
  editSet: (
    setId: string,
    setData: SetBody
  ) => Promise<Set>,
  deleteSet: (setId: string) => Promise<Set>,
} 

const useSetService = (): SetServiceInterface => {
  const axiosPrivate = useAxiosPrivate();

  const createSet = async (setData: SetBody): Promise<Set> => {
    try {
      const response = await axiosPrivate.post(
        SET_URL,
        JSON.stringify(setData)
      )
      return response.data;
    } catch (err) {
      console.error("Error creating set:", err);
      throw err;
    }
  }

  const editSet = async (
    setId: string,
    setData: SetBody
  ): Promise<Set> => {
    try {
      const response = await axiosPrivate.put(
        `${SET_URL}/${setId}`,
        JSON.stringify(setData)
      )
      return response.data;
    } catch (err) {
      console.error("Error saving set:", err);
      throw err;
    }
  }

  const deleteSet = async (setId: string): Promise<Set> => {
    try {
      const response = await axiosPrivate.delete(
        `${SET_URL}/${setId}`,
      )
      return response.data;
    } catch (err) {
      console.error("Error deleting set:", err);
      throw err;
    }
  }

  return {
    createSet,
    editSet,
    deleteSet,
  }
}

export default useSetService;