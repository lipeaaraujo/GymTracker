import { IconContext } from "react-icons";

function ExerciseBox({ icon, name }) {
  return (
    <IconContext.Provider value={ { size: 40 } }>
      <button 
        className="bg-zinc-700 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300"
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          {icon}
          {name}
        </div>
      </button>
    </IconContext.Provider>
  )
}

export default ExerciseBox;