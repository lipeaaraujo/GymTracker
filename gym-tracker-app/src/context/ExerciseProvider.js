import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

const ExerciseContext = createContext({});

export const ExerciseProvider = () => {
  const [currentExercise, setCurrentExercise] = useState({});

  return (
    <ExerciseContext.Provider value={{ currentExercise, setCurrentExercise }}>
      <Outlet />
    </ExerciseContext.Provider>
  );
};

export default ExerciseContext;
