import { useEffect, useState } from "react";
import { FaPlus, FaWeightHanging } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/dateUtils";
import { GiWeight, GiWeightLiftingUp } from "react-icons/gi";
import NewSetForm from "../../components/sets/NewSetForm";
import SectionHeader from "../../components/SectionHeader";
import useSession from "../../hooks/useSession";
import EditSessionModal from "../../components/session/EditSessionModal";
import ConfirmModal from "../../components/ConfirmDeleteModal";
import useExercise from "../../hooks/useExercise";
import SetDetails from "../../components/sets/SetDetails";
import SessionInfo from "../../components/exercises/SessionInfo";

const SESSIONS_URL = "/session";

const ViewSession = () => {
  const { id } = useParams();
  const { currentExercise } = useExercise();
  const { curSession, setCurSession } = useSession();
  const [numSets, setNumSets] = useState(0);
  const [maxLoad, setMaxLoad] = useState(0);
  const [formattedDate, setFormattedDate] = useState();
  const [errMsg, setErrMsg] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [editModal , setEditModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const [addingSet, setAddingSet] = useState(false);

  // fetches session data
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSessionAndSets = async () => {
      try {
        const response = await axiosPrivate.get(`${SESSIONS_URL}/${id}/sets`, {
          signal: controller.signal,
        });
        console.log(response?.data);
        setCurSession(response?.data);
        setNumSets(curSession.numSets);
        setMaxLoad(curSession.biggestLoad);
        setErrMsg("");
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

    getSessionAndSets();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const deleteSession = async () => {
    try {
      setSubmitting(true);
      await axiosPrivate.delete(
        `${SESSIONS_URL}/${id}`
      )
      setSubmitting(false)
      navigate(-1);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Unauthorized");
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setErrMsg("Request failed");
      }
    }
  }

  // updates number of sets and max load 
  // when an operation is made with the sets.
  useEffect(() => {
    const updateNumSetsAndLoad = () => {
      if (curSession?.sets) {
        // updating number of sets
        setNumSets(curSession.sets.length);
        // find set with the biggest load
        let maxLoad = 0;
        curSession.sets.forEach(set => {
          if (set.weight > maxLoad) maxLoad = set.weight;
        });
        setMaxLoad(maxLoad);
      } else {
        curSession.numSets = 0;
        curSession.biggestLoad = 0;
      }
    }
    const updateDate = () => {
      curSession?.date && setFormattedDate(formatDate(curSession?.date));
    }
    updateNumSetsAndLoad();
    updateDate();
  }, [curSession, setCurSession]);

  return (
    <>
    <EditSessionModal 
      open={editModal}
      onClose={() => setEditModal(false)}
    />
    <ConfirmModal 
      open={confirmDeleteModal}
      onClose={() => setConfirmDeleteModal(false)}
      title="Delete Session"
      message="Are you sure you want to delete this session?"
      handleConfirm={deleteSession}
      disabled={submitting}
    />
    <section className="flex flex-col h-full gap-4 overflow-y-scroll">
      <SectionHeader
        title="Session Details:"
        canEdit={curSession ? true : false}
        handleEdit={() => setEditModal(true)}
        handleDelete={() => setConfirmDeleteModal(true)}
        errMsg={errMsg}
      />
      {curSession?.date && (
        <SessionInfo 
          date={formattedDate}
          maxLoad={maxLoad}
          numSets={numSets}
        />
      )}
      {curSession?.date && (
        <article className="flex flex-col items-center gap-2">
          <header className="w-full flex gap-2 justify-center">
            <FaWeightHanging size={28} />
            <h2>Sets:</h2>
          </header>
          {curSession.sets.map((set) => (
            <SetDetails key={set._id} set={set} />
          ))}

          {addingSet && (
            <NewSetForm
              sessionId={curSession._id}
              setSession={setCurSession}
              handleCloseForm={() => setAddingSet(false)}
            />
          )}
          <button
            onClick={() => setAddingSet(true)}
            className="bg-neutral-900 w-full rounded-xl hover:bg-zinc-600 flex justify-center"
          >
            <FaPlus size={20} />
          </button>
        </article>
      )}
    </section>
    </>
  );
};

export default ViewSession;
