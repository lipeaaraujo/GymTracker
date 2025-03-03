import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Outlet } from "react-router-dom";
import { Exercise } from "../types/exercise.types";

type ExerciseContextType = {
  currentExercise: Exercise | null,
  setCurrentExercise: Dispatch<SetStateAction<Exercise | null>>
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  return (
    <ExerciseContext.Provider value={{ currentExercise, setCurrentExercise }}>
      <Outlet />
    </ExerciseContext.Provider>
  );
};

export default ExerciseContext;
