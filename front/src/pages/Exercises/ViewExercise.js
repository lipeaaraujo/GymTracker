import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NewSessionModal from "../../components/session/NewSessionModal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SessionBox from "../../components/session/SessionBox";
import CreateNewButton from "../../components/CreateNewButton";
import { CgGym } from "react-icons/cg";
import { CiCalendar } from "react-icons/ci";
import useExercise from "../../hooks/useExercise";
import SectionHeader from "../../components/SectionHeader";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import EditExerciseModal from "../../components/exercises/EditExerciseModal";
import ExerciseInfo from "../../components/exercises/ExerciseInfo";

const EXERCISE_URL = "/exercise";

function ViewExercise() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);
  const { currentExercise, setCurrentExercise } = useExercise();
  const location = useLocation();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const [sessionModal, setSessionModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

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

  const deleteExercise = async () => {
    try {
      setSubmitting(true);
      await axiosPrivate.delete(
        `${EXERCISE_URL}/${id}`,
      )
      navigate(-1);
      setSubmitting(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Unauthorized");
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setErrMsg("Delete failed");
      }
    }
  }

  return (
    <>
      <NewSessionModal
        open={sessionModal}
        onClose={() => setSessionModal(false)}
        setExercise={setCurrentExercise}
      />
      <EditExerciseModal
        open={editModal}
        onClose={() => setEditModal(false)}
      />
      <ConfirmDeleteModal
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        title="Delete Exercise"
        message="Are you sure you want to delete this exercise?"
        handleConfirm={deleteExercise}
        disabled={submitting}
      />

      <section className="flex flex-col gap-4 h-full overflow-y-scroll">
        <SectionHeader 
          title="Exercise Details:"
          canEdit={currentExercise?.name ? true : false}
          handleEdit={() => setEditModal(true)}
          handleDelete={() => setConfirmDeleteModal(true)}
          errMsg={errMsg}
        />
        {currentExercise?.name && (
          <ExerciseInfo 
            name={currentExercise.name}
            description={currentExercise.description}
            personalBest={currentExercise.personalBest}
          />
        )}
        {currentExercise?.name && (
          <article className="flex flex-col gap-2">
            <header className="w-full flex justify-center items-center gap-2 text-xl">
              <CiCalendar size={28} />
              <h2>Sessions</h2>
            </header>
            <section className="flex flex-row gap-4 flex-wrap">
              {currentExercise?.sessions &&
                currentExercise.sessions.map((session, i) => (
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
