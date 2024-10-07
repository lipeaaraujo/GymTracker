import { useState } from "react";
import Modal from "./Modal";


function ExerciseModal({ open, onClose }) {

  const [name, setName] = useState("")

  return (
    <Modal open={ open } onClose={ onClose } title={ "New Exercise" }>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          Name:
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button className="w-full p-2 bg-zinc-700 rounded-xl
                         hover:bg-zinc-600">
          Confirm
        </button>
      </form>

    </Modal>
  )
}

export default ExerciseModal;