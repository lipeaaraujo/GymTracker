import { IoIosClose } from "react-icons/io";

function Modal({ open, onClose, title, children }) {
  return (
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${ open ? "visible bg-black/20" : "invisible" }  
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()} // stops event propagation to the parent (backdrop)
        className="bg-zinc-800 flex flex-col items-center p-4 rounded-xl"
      >
        <header className="flex flex-row justify-start w-full">
          <p className="absolute left-1/2 -translate-x-1/2">
            {title}
          </p>
          <button className="ml-auto" onClick={onClose}>
            <IoIosClose size={32}/>
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}

export default Modal;