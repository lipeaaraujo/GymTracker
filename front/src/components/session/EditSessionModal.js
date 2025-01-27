import { useEffect, useState } from "react";
import Modal from "../Modal";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useExercise from "../../hooks/useExercise";
import { useLocation, useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import { formatDateToYMD } from "../../utils/dateUtils";

const SESSIONS_URL = "/session";

const EditSessionModal = ({ open, onClose }) => {
  const { currentExercise } = useExercise();
  const { curSession, setCurSession } = useSession();
  const axiosPrivate = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    curSession?.date && setDate(formatDateToYMD(curSession?.date));
  }, [curSession])

  useEffect(() => {
    const result = date ? true : false;
    setFormValid(result);
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await axiosPrivate.put(
        `${SESSIONS_URL}/${curSession._id}`,
        JSON.stringify({ exercise: currentExercise._id, date })
      );
      setSubmitting(false);
      setDate("");
      setCurSession(prev => ({
        ...response?.data,
        sets: prev.sets,
      }));
      onClose()
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 403) {
        setErrMsg("Unauthorized");
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setErrMsg('Failed to Create Session');
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={"Edit Session"}>
      <p className={errMsg ? "w-full bg-red-800 p-1 rounded-lg" : "hidden"}>{errMsg}</p>
      <form className="flex flex-col w-56" onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          className="w-full p-2 mt-8 bg-zinc-700 rounded-xl
                         hover:bg-zinc-600"
          disabled={!formValid || submitting}
        >
          Confirm
        </button>
      </form>
    </Modal>
  );
}

export default EditSessionModal;
