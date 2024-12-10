import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SessionModal from "../../components/NewSessionModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SessionBox from "../../components/SessionBox";
import CreateNewButton from "../../components/CreateNewButton";
import { CgGym } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";

const EXERCISE_URL = "/exercise";

function ViewExercise() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState({});
  const [sessionModal, setSessionModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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
        console.log(response?.data);
        isMounted && setExercise(response?.data);
        isMounted && setErrMsg("");
      } catch (err) {
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

  return (
    <>
      <SessionModal
        open={sessionModal}
        onClose={() => setSessionModal(false)}
      />

      <section className="flex flex-col gap-4">
        <article className="flex flex-col gap-2">
          <header className="w-full flex justify-center items-center gap-2">
            <CgGym size={28} />
            <h2>{exercise.name}</h2>
          </header>
          <div className="w-full flex justify-center">
            <p className="bg-neutral-900 w-1/2 p-2 rounded-xl text-wrap">
              <b>Description:</b> {exercise.description}
            </p>
          </div>
        </article>
        <article>
          <header className="w-full flex justify-center items-center gap-2 text-xl">
            <CiCalendar size={28}/>
            <h2>Sessions</h2>
          </header>
          <div className="flex flex-row gap-4 flex-wrap">
            {exercise?.sessions &&
              exercise.sessions.map((session, i) => (
                <SessionBox
                  key={i}
                  handleClick={() => console.log("abrir sessão")}
                  session={session}
                />
              ))}
            <CreateNewButton handleClick={() => setSessionModal(true)} />
          </div>
        </article>
      </section>
    </>
  );
}

export default ViewExercise;
