import { FaPlus } from "react-icons/fa"

const CreateNewButton = ({ handleClick }) => {
  return (
    <button
      className="bg-neutral-900 w-32 h-32 rounded-xl hover:bg-zinc-600 duration-300 flex flex-col items-center justify-center"
      onClick={handleClick}
    >
      <FaPlus size={20} />
    </button>
  )
}

export default CreateNewButton;