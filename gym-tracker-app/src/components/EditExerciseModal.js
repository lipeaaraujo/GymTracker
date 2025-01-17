import { useEffect, useState } from "react";
import Modal from "./Modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import useExercise from "../hooks/useExercise";

const EXERCISE_URL = "/exercise";

function EditExerciseModal({ open, onClose }) {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const { currentExercise, setCurrentExercise } = useExercise();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setName(currentExercise?.name);
    setDescription(currentExercise?.description);
  }, [currentExercise])

  useEffect(() => {
    const result = name ? true : false;
    setFormValid(result);
  }, [name, description]);

  useEffect(() => {
    setErrMsg('');
  }, [name, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent bypass of required fields
    if (!name) {
      setErrMsg('Invalid Entry');
      return;
    }

    try {
      const response = await axiosPrivate.put(
        `${EXERCISE_URL}/${currentExercise._id}`,
        JSON.stringify({ user: auth.user.id, name, description }),
      )
      setName("");
      setDescription("");
      setCurrentExercise(prev => ({ 
        ...response?.data,
        sessions: prev.sessions, // retain the sessions from the current exercise
      }));
      onClose();
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg('Failed to Create Exercise')
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={"Edit Exercise"}>
      <p className={errMsg ? "w-full bg-red-800 p-1 rounded-lg" : "hidden"}>{errMsg}</p>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <label htmlFor="name" className="flex flex-col">
          Name:
        </label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="description" className="flex flex-col">
          Description:
        </label>
        <textarea
          className="h-32"
          id="description"
          autoComplete="off"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={!formValid} className="w-full mt-8">
          Confirm
        </button>
      </form>
    </Modal>
  );
}

export default EditExerciseModal;