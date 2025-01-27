import { useEffect, useState } from "react";
import Modal from "./Modal";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const EXERCISE_URL = "/exercise";
const NAME_REGEX = /^\w+(?: \w+)*$/;
const DESCRIPTION_REGEX = /^\w+(?: \w+)*$/;

function ExerciseModal({ open, onClose, setExercises }) {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [description, setDescription] = useState("");
  const [validDesc, setValidDesc] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    // only test regex if description not empty
    if (description) {
      setValidDesc(DESCRIPTION_REGEX.test(description));
    } else {
      setValidDesc(true);
    }
  }, [description]);

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
      const response = await axiosPrivate.post(
        EXERCISE_URL,
        JSON.stringify({ user: auth.user.id, name, description }),
      )
      setName("");
      setDescription("");
      setExercises(prev => {
        return [...prev, response.data]
      }); 
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
    <Modal open={open} onClose={onClose} title={"New Exercise"}>
      <p className={errMsg ? "w-full bg-red-800 p-1 rounded-lg" : "hidden"}>{errMsg}</p>
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        <label htmlFor="name" className="flex flex-col">
          Name:
        </label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          maxLength={50}
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
          maxLength={1000}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button 
          disabled={!validName || !validDesc}
          className="w-full mt-8"
        >
          Confirm
        </button>
      </form>
    </Modal>
  );
}

export default ExerciseModal;
