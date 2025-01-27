import { useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { GiWeight, GiWeightLiftingUp } from "react-icons/gi";
import { GoChecklist } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import useSession from "../hooks/useSession";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmDeleteModal";

const SET_URL = "/set";
const MAX_REPS = 1000
const MAX_WEIGHT = 10000

const SetDetails = ({ set }) => {
  const { curSession, setCurSession } = useSession();
  const [setId, setSetId] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [formValid, setFormValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [editing, setEditing] = useState(false);

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSetId(set._id);
    setReps(set.numReps);
    setWeight(set.weight);
    setErrMsg("");
  }, [set]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!reps || !weight) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axiosPrivate.put(
        `${SET_URL}/${set._id}`,
        JSON.stringify({
          session: curSession._id,
          numReps: reps,
          weight: weight,
        })
      );
      setReps(0);
      setWeight("");
      setCurSession((prev) => {
        return {
          ...prev,
          sets: prev.sets.map((s) =>
            s._id === response?.data?._id ? response?.data : s
          ),
        };
      });
      setErrMsg("");
      setEditing(false);
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Unauthorized");
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setErrMsg("Failed to Save Set");
      }
    }
  };

  const deleteSet = async () => {
    try {
      const response = await axiosPrivate.delete(
        `${SET_URL}/${setId}`,
      )
      setCurSession(prev => ({
        ...prev,
        sets: prev.sets.filter(set => set._id !== setId),
      }))
      setConfirmDeleteModal(false);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Unauthorized");
        navigate("/login", { state: { from: location }, replace: true });
      } else {
        setErrMsg("Failed to Delete Set");
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
    <>
      <ConfirmModal
        open={confirmDeleteModal}
        onClose={() => setConfirmDeleteModal(false)}
        title="Delete Set"
        message="Are you sure you want to delete the set?"
        handleConfirm={deleteSet}
      />
      {editing ? (
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
            autoComplete="off"
            max={MAX_REPS}
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
            autoComplete="off"
            max={MAX_WEIGHT}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <p className={errMsg ? "error" : "hidden"}>{errMsg}</p>
          <button
            className="p-1 bg-green-700 hover:bg-green-500 disabled:bg-zinc-700"
            type="submit"
            disabled={!formValid}
          >
            <GoChecklist size={28} />
          </button>
          <button
            className="p-1 bg-red-700 hover:bg-red-500"
            type="button"
            onClick={() => setEditing(false)}
          >
            <IoIosCloseCircleOutline size={28} />
          </button>
        </form>
      ) : (
        <section className="bg-zinc-700 w-full rounded-xl p-1 px-4 flex gap-2 items-center">
          <section className="w-fit flex items-center gap-1">
            <GiWeightLiftingUp size={20} />
            <p>
              <b>Repetitions:</b> {set.numReps}
            </p>
          </section>
          <section className="w-fit flex items-center gap-1 mr-auto">
            <GiWeight size={20} />
            <p>
              <b>Weight:</b> {set.weight} kg
            </p>
          </section>
          <button className="p-1" onClick={() => setEditing(true)}>
            <CiEdit size={28} />
          </button>
          <button className="p-1 hover:bg-red-600" onClick={() => setConfirmDeleteModal(true)}>
            <CiTrash size={28} />
          </button>
        </section>
      )}
    </>
  );
};

export default SetDetails;
