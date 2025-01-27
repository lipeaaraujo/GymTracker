import { useEffect, useRef, useState } from "react";
import { CgGym } from "react-icons/cg";
import ExerciseModal from "../../components/exercises/NewExerciseModal";
import ExerciseBox from "../../components/exercises/ExerciseBox";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import CreateNewButton from "../../components/CreateNewButton";
import { useLocation, useNavigate } from "react-router-dom";

const USER_URL = "/user";
const EXERCISE_URL = "/exercises";

function Exercises() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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
        console.log(exercises);
        isMounted && setExercises(response?.data);
        isMounted && setErrMsg("");
      } catch (err) {
        if (!isMounted) return;
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 403) {
          setErrMsg("Unauthorized");
          navigate("/login", { state: { from: location }, replace: true });
        } else {
          setErrMsg("Request Failed");
        }
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
        setExercises={setExercises}
      />
      <section className="h-full overflow-y-scroll">
        <header className="pb-1">
          <h2>Your exercises:</h2>
          <p className={errMsg ? "w-fit bg-red-800 p-1 rounded-lg" : "hidden"}>
            {errMsg}
          </p>
        </header>
        <article className="flex gap-4 flex-wrap">
          {exercises.map((exercise) => (
            <ExerciseBox
              key={exercise.id}
              icon={<CgGym />}
              id={exercise._id}
              name={exercise.name}
            />
          ))}
          <CreateNewButton handleClick={() => setExerciseModal(true)} />
        </article>
      </section>
    </>
  );
}

export default Exercises;
