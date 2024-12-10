import { useEffect, useState } from "react";
import Modal from "./Modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useExercise from "../hooks/useExercise";
import { useLocation, useNavigate } from "react-router-dom";

const SESSIONS_URL = "/session";

function SessionModal({ open, onClose, setExercise }) {
  const { currentExercise } = useExercise();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const [date, setDate] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const result = date ? true : false;
    setFormValid(result);
  }, [date]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        SESSIONS_URL,
        JSON.stringify({ exercise: currentExercise._id, date })
      );
      setDate("");
      setExercise(prev => {
        return {...prev, sessions: [...prev.sessions, response?.data]};
      });
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
    <Modal open={open} onClose={onClose} title={"New Session"}>
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
          disabled={!formValid}
        >
          Confirm
        </button>
      </form>
    </Modal>
  );
}

export default SessionModal;
