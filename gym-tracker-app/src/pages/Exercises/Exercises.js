import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import ExerciseModal from "../../components/ExerciseModal";
import ExerciseBox from "../../components/ExerciseBox";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const USER_URL = "/user";
const EXERCISE_URL = "/exercises";

function Exercises() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [exercises, setExercises] = useState([]);
  const [exerciseModal, setExerciseModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getExercises = async () => {
      try {
        const response = await axiosPrivate.get(
          `${USER_URL}/${auth.user.id}${EXERCISE_URL}`,
          {
            signal: controller.signal,
          }
        );
        isMounted && setExercises(response?.data);
      } catch (err) {
        console.error(err);
      }
    };

    getExercises();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <ExerciseModal
        open={exerciseModal}
        onClose={() => setExerciseModal(false)}
      />

      <div className="flex gap-4 flex-wrap">
        {exercises.map((exercise) => (
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
