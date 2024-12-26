import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SessionModal from "../../components/NewSessionModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SessionBox from "../../components/SessionBox";
import CreateNewButton from "../../components/CreateNewButton";
import { CgGym } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import useExercise from "../../hooks/useExercise";
import SectionHeader from "../../components/SectionHeader";

const EXERCISE_URL = "/exercise";

function ViewExercise() {
  const { id } = useParams();
  const [exercise, setExercise] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { setCurrentExercise } = useExercise();
  const location = useLocation();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const [sessionModal, setSessionModal] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getExercise = async () => {
      try {
        const response = await axiosPrivate.get(
          `${EXERCISE_URL}/${id}/sessions`,
          {
            signal: controller.signal,
          }
        );
        isMounted && setExercise(response?.data);
        isMounted && setCurrentExercise(response?.data);
        isMounted && setErrMsg("");
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 403) {
          setErrMsg("Unauthorized");
          navigate("/login", { state: { from: location }, replace: true });
        } else {
          setErrMsg("Request failed");
        }
      }
    };

    getExercise();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const viewSession = (sessionId) => {
    navigate(`/session/${sessionId}`);
  }

  return (
    <>
      <SessionModal
        open={sessionModal}
        onClose={() => setSessionModal(false)}
        setExercise={setExercise}
      />

      <section className="flex flex-col gap-4 h-full overflow-y-scroll">
        <header className="pb-1">
          <SectionHeader title="Exercise Details:"/>
          <p className={errMsg ? "w-fit bg-red-800 p-1 rounded-lg" : "hidden"}>
            {errMsg}
          </p>
        </header>
        {exercise && (
          <article className="flex flex-col gap-2">
            <header className="w-full flex justify-center items-center gap-2">
              <CgGym size={28} />
              <h2>{exercise.name}</h2>
            </header>
            <section className="w-full flex justify-center">
              <p className="bg-neutral-900 w-96 p-2 rounded-xl text-wrap break-words">
                <b>Description:</b> {exercise.description}
              </p>
            </section>
          </article>
        )}
        {exercise && (
          <article className="flex flex-col gap-2">
            <header className="w-full flex justify-center items-center gap-2 text-xl">
              <CiCalendar size={28} />
              <h2>Sessions</h2>
            </header>
            <section className="flex flex-row gap-4 flex-wrap">
              {exercise?.sessions &&
                exercise.sessions.map((session, i) => (
                  <SessionBox
                    key={i}
                    numSets={session.numSets}
                    date={session.date}
                    handleClick={() => viewSession(session._id)}
                  />
                ))}
              <CreateNewButton handleClick={() => setSessionModal(true)} />
            </section>
          </article>
        )}
      </section>
    </>
  );
}

export default ViewExercise;
