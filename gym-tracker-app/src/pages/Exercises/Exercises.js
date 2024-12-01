import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import ExerciseModal from "../../components/ExerciseModal";
import ExerciseBox from "../../components/ExerciseBox";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const EXERCISE_URL = "/exercise"

function Exercises() {

  const { auth } = useAuth();

  const [exercises, setExercises] = useState([]);
  const [exerciseModal, setExerciseModal] = useState(false)
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const getExercises = async () => {
      try {
        const response = await axios.get(
          `${EXERCISE_URL}`,
          {
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.accessToken}` },
            withCredentials: true
          }
        )
        console.log(response?.data);
        setExercises(response?.data);
      } catch (err) {
        console.log(err?.response);
        if (err?.response) {
          setErrMsg("Error getting exercises");
        } else {
          setErrMsg("No Server Response");
        }
      }
    }
    getExercises();
  }, [])

  return (
    <>
      <ExerciseModal open={exerciseModal} onClose={() => setExerciseModal(false)} />

      <div className="flex gap-4 flex-wrap">

        {exercises.map(exercise => (
          <ExerciseBox icon={<CgGym />} name={exercise.name} />
        ))}

        <button 
          className="bg-neutral-900 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300"
          onClick={() => setExerciseModal(true)}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <FaPlus />
          </div>
        </button>
      </div>
    </>
  );
}

export default Exercises;