import { CiTrash } from "react-icons/ci";
import Modal from "./Modal"

const ConfirmModal = ({ open, onClose, title, message, handleConfirm, disabled=false }) => {
  return (
    <Modal
      onClose={onClose}
      open={open}
      title={title}
    >
      <p className="w-64 mb-4 text-wrap">{message}</p>
      <button
        disabled={disabled}
        className="w-64 flex justify-center items-center gap-1 bg-red-700 hover:bg-red-600" 
        onClick={handleConfirm}
      >
        <CiTrash size={20}/>
        Confirm
      </button>
    </Modal>
  )
}

export default ConfirmModal;