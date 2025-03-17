import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ExerciseBody, Exercise } from "../types/exercise.types";

const EXERCISE_URL = "/exercise";
const USER_URL = "/user";

interface ExerciseServiceInterface {
  createExercise: (exerciseData: ExerciseBody) => Promise<Exercise>,
  editExercise: (
    exerciseId: string,
    exerciseData: ExerciseBody
  ) => Promise<Exercise>,
  deleteExercise: (exerciseId: string) => Promise<Exercise>,
  getUserExercises: (userId: string) => Promise<Exercise[]>,
  getExerciseAndSessions: (exerciseId: string) => Promise<Exercise>
} 

const useExerciseService = (): ExerciseServiceInterface => {
  const axiosPrivate = useAxiosPrivate();

  const createExercise = async (exerciseData: ExerciseBody): Promise<Exercise> => {
    try {
      const response = await axiosPrivate.post(
        EXERCISE_URL,
        JSON.stringify(exerciseData)
      )
      return response.data;
    } catch (err) {
      console.error("Error creating exercise:", err);
      throw err;
    }
  }

  const editExercise = async (
    exerciseId: string,
    exerciseData: ExerciseBody
  ): Promise<Exercise> => {
    try {
      const response = await axiosPrivate.put(
        `${EXERCISE_URL}/${exerciseId}`,
        JSON.stringify(exerciseData)
      )
      return response.data;
    } catch (err) {
      console.error("Error saving exercise:", err);
      throw err;
    }
  }

  const deleteExercise = async (exerciseId: string): Promise<Exercise> => {
    try {
      const response = await axiosPrivate.delete(
        `${EXERCISE_URL}/${exerciseId}`,
      )
      return response.data;
    } catch (err) {
      console.error("Error deleting exercise:", err);
      throw err;
    }
  }

  const getUserExercises = async (userId: string): Promise<Exercise[]> => {
    try {
      const response = await axiosPrivate.get(
        `${USER_URL}/${userId}/exercises`,
      )
      return response.data;
    } catch (err) {
      console.error("Error fetching exercises:", err);
      throw err;
    }
  }

  const getExerciseAndSessions = async (exerciseId: string): Promise<Exercise> => {
    try {
      const response = await axiosPrivate.get(
        `${EXERCISE_URL}/${exerciseId}/sessions`,
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching exercise:", err);
      throw err;
    }
  }

  return {
    createExercise,
    editExercise,
    deleteExercise,
    getUserExercises,
    getExerciseAndSessions,
  }
}

export default useExerciseService;