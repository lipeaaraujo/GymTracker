import { useState } from "react";
import Modal from "./Modal";


function SessionModal({ open, onClose }) {

  const [numSets, setNumSets] = useState("");
  const [date, setDate] = useState("");

  return (
    <Modal open={ open } onClose={ onClose } title={ "New Session" }>
      <form className="flex flex-col">
        <label htmlFor="numSets">
          Number of Sets:
        </label>
        <input 
          type="text"
          id="numSets"
          value={numSets}
          onChange={(e) => setNumSets(e.target.value)}
        />
        <label htmlFor="date">
          Date:
        </label>
        <input 
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="w-full p-2 mt-8 bg-zinc-700 rounded-xl
                         hover:bg-zinc-600">
          Confirm
        </button>
      </form>

    </Modal>
  )
}

export default SessionModal;