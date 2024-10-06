function ExerciseModal({ open, onClose, children }) {
  return (
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${ open ? "visible bg-black/20" : "invisible" }  
      `}
      onClick={onClose}
    >
      {children}
    </div>
  )
}

export default ExerciseModal;