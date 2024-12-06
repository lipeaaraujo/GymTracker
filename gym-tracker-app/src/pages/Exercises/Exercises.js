import { useEffect, useState } from "react";
import { CgGym } from "react-icons/cg";
import { FaPlus } from "react-icons/fa";
import ExerciseModal from "../../components/ExerciseModal";
import ExerciseBox from "../../components/ExerciseBox";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import CreateNewButton from "../../components/CreateNewButton";

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
      <section>
        <header className="pb-1">
          <h2>Your exercises:</h2>
        </header>
        <article className="flex gap-4 flex-wrap">
          {exercises.map((exercise) => (
            <ExerciseBox icon={<CgGym />} name={exercise.name} />
          ))}
          <CreateNewButton handleClick={() => setExerciseModal(true)}/>
        </article>
      </section>
    </>
  );
}

export default Exercises;
