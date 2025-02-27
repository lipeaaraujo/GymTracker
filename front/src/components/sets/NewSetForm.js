import { useEffect, useState } from "react";
import { GoChecklist } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";

const SET_URL = "/set";
const MAX_REPS = 1000
const MAX_WEIGHT = 10000

const NewSetForm = ({ handleCloseForm }) => {
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState(0);
  const [formValid, setFormValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const { curSession, setCurSession } = useSession();

  const axiosPrivate = useAxiosPrivate();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!reps || !weight) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axiosPrivate.post(
        SET_URL,
        JSON.stringify({
          session: curSession._id,
          numReps: reps,
          weight: weight,
        })
      );
      setSubmitting(false);

      // updating session
      setCurSession((prev) => ({
        ...prev,
        numSets: prev.numSets+1,
        biggestLoad: weight > prev.biggestLoad ? weight : prev.biggestLoad,
        sets: [...prev.sets, response?.data]
      }));

      // clearing form
      setReps(0);
      setWeight(0);
      setErrMsg("");
      handleCloseForm();
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Unauthorized");
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setErrMsg("Failed to Create Set");
      }
    }
  };

  useEffect(() => {
    if (!reps || reps < 1 || reps > MAX_REPS) {
      setFormValid(false);
      return;
    }
    if (!weight || weight <= 0 || weight > MAX_WEIGHT) {
      setFormValid(false);
      return;
    }
    setFormValid(true);
  }, [reps, weight]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-900 w-full flex rounded-xl p-1 px-4 gap-2 items-center"
    >
      <label htmlFor="reps">Repetitions: </label>
      <input
        className="p-0 px-2 w-20 text-right"
        id="reps"
        type="number"
        inputMode="numeric"
        min={0}
        max={MAX_REPS}
        autoComplete="off"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <label htmlFor="reps">Weight (kg): </label>
      <input
        className="p-0 px-2 w-20 text-right mr-auto"
        id="reps"
        type="number"
        inputMode="numeric"
        min={0}
        max={MAX_WEIGHT}
        autoComplete="off"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <p className={errMsg ? "error" : "hidden"}>{errMsg}</p>
      <button
        className="p-1 bg-green-700 hover:bg-green-500 disabled:bg-zinc-700"
        type="submit"
        disabled={!formValid || submitting}
      >
        <GoChecklist size={28} />
      </button>
      <button
        disabled={submitting}
        className="p-1 bg-red-700 hover:bg-red-500"
        type="button"
        onClick={handleCloseForm}
      >
        <IoIosCloseCircleOutline size={28} />
      </button>
    </form>
  );
};

export default NewSetForm;
