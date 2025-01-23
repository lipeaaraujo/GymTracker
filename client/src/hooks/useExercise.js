import { useContext } from "react"
import ExerciseContext from "../context/ExerciseProvider"

const useExercise = () => {
  return useContext(ExerciseContext);
}

export default useExercise;