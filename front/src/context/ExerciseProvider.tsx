import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Exercise } from "../types/exercise.types";

type ExerciseContextType = {
  currentExercise: Exercise | null,
  setCurrentExercise: Dispatch<SetStateAction<Exercise | null>>
}

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export const ExerciseProvider = () => {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);

  // fetches the stored exercise from localStorage on page reload.
  useEffect(() => {
    const storedExercise = localStorage.getItem("exercise");
    if (storedExercise) {
      setCurrentExercise(JSON.parse(storedExercise));
    }
  }, []);

  // stores exercise on localStorage everytime it updates.
  useEffect(() => {
    if (!currentExercise) return;
    localStorage.setItem("exercise", JSON.stringify(currentExercise));
  }, [currentExercise])

  return (
    <ExerciseContext.Provider value={{ currentExercise, setCurrentExercise }}>
      <Outlet />
    </ExerciseContext.Provider>
  );
};

export default ExerciseContext;
