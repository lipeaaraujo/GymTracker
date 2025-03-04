import { useContext } from "react"
import ExerciseContext from "../context/ExerciseProvider"

const useExercise = () => {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error("useExercise must be used within an ExerciseProvider");
  }
  return context;
}

export default useExercise;