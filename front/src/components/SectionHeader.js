import { CiEdit, CiTrash } from "react-icons/ci";
import BackButton from "./BackButton";

const SectionHeader = ({ title, canEdit, handleEdit, handleDelete, errMsg }) => {
  return (
    <header className="pb-1">
      <section className="flex gap-2">
        <BackButton />
        <h2 className="mr-auto text-center">{title}</h2>
        {canEdit && (
          <button onClick={handleEdit}>
            <CiEdit size={28} />
          </button>
        )}
        {canEdit && (
          <button className="bg-red-700 hover:bg-red-600" onClick={handleDelete}>
            <CiTrash size={28} />
          </button>
        )}
      </section>
      <p className={errMsg ? "w-fit bg-red-800 p-1 rounded-lg" : "hidden"}>
        {errMsg}
      </p>
    </header>
  );
};

export default SectionHeader;
