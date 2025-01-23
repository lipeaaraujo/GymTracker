import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

function ExerciseBox({ icon, id, name }) {
  const navigate = useNavigate();

  const ViewExercise = () => {
    navigate(`/exercise/${id}`);
  };

  return (
    <button
      onClick={ViewExercise}
      className="bg-zinc-700 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300 flex flex-col items-center justify-center"
    >
      <IconContext.Provider value={{ size: 40 }}>
        {icon}
        {name}
      </IconContext.Provider>
    </button>
  );
}

export default ExerciseBox;
