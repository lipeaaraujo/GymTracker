import { IconContext } from "react-icons";

function ExerciseBox({ icon, name }) {
  return (
    <button className="bg-zinc-700 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300 flex flex-col items-center justify-center">
      <IconContext.Provider value={{ size: 40 }}>
        {icon}
        {name}
      </IconContext.Provider>
    </button>
  );
}

export default ExerciseBox;
