import { useState } from "react";
import SessionModal from "../../components/SessionModal";
import { FaPlus } from "react-icons/fa";

function ViewExercise() {

  const exercise = {
    name: "Legpress",
    sessions: [
      {
        load: 150.0,
        date: "07-10-2024",
      },
      {
        load: 165.0,
        date: "14-10-2024",
      }
    ]
  }

  const [sessionModal, setSessionModal] = useState(false);

  return (
    <div>
      <SessionModal open={sessionModal} onClose={() => setSessionModal(false)} />

      <header className="w-full m-auto text-center text-xl">
        {exercise.name}
      </header>
      <div className="flex flex-row gap-4 flex-wrap">
        {exercise.sessions.map((set) => (
          <div className="bg-zinc-700 w-32 h-32 rounded-xl">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p>{set.load} kg</p>
              <p>{set.date}</p>
            </div>
          </div>  
        ))}
        <button 
          className="bg-neutral-900 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300"
          onClick={() => setSessionModal(true)}
        >
          <div className="w-full h-full flex flex-col items-center justify-center">
            <FaPlus />
          </div>
        </button>
      </div>
      
    </div>
  )
}

export default ViewExercise;