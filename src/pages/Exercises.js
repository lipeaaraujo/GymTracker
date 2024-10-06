import { useState } from "react";
import { IconContext } from "react-icons";
import { CgGym } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import ExerciseModal from "../components/ExerciseModal";

function Exercises() {

  const [exerciseModal, setExerciseModal] = useState(false)

  return (
    <>
      <ExerciseModal open={exerciseModal} onClose={() => setExerciseModal(false)}>
        <div className="bg-zinc-800 w-1/5 h-1/3 rounded-xl"></div>
      </ExerciseModal>

      <div className="flex gap-4 flex-wrap">
        <IconContext.Provider value={ { size: 40 } }>
          <button 
            className="bg-zinc-700 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300"
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <CgGym />
              Legpress
            </div>
          </button>
          <button 
            className="bg-neutral-900 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300"
            onClick={() => setExerciseModal(true)}
          >
            <div className="w-full h-full flex flex-col items-center justify-center">
              <FaPlus />
            </div>
          </button>
        </IconContext.Provider>
      </div>
    </>
  );
}

export default Exercises;