import { CiEdit, CiTrash } from "react-icons/ci"

const SectionHeader = ({ title, handleEdit, handleDelete }) => {
  return (
    <section className="flex gap-2">
      <h2 className="mr-auto">{title}</h2>
      <button onClick={handleEdit}>
        <CiEdit size={28}/>
      </button>
      <button className="bg-red-700 hover:bg-red-600" onClick={handleDelete}>
        <CiTrash size={28}/>
      </button>
    </section>
  )
}

export default SectionHeader;