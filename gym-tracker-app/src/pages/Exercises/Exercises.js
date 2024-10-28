import { useState } from "react";
import { CgGym } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import ExerciseModal from "../../components/ExerciseModal";
import ExerciseBox from "../../components/ExerciseBox";

function Exercises() {

  const [exerciseModal, setExerciseModal] = useState(false)

  return (
    <>
      <ExerciseModal open={exerciseModal} onClose={() => setExerciseModal(false)} />

      <div className="flex gap-4 flex-wrap">

        <ExerciseBox icon={<CgGym />} name="Legpress" />

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