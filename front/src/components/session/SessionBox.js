import { formatDate } from "../../utils/dateUtils";

const SessionBox = ({ numSets, date, handleClick }) => {
  const formattedDate = formatDate(date);

  return (
    <button
      onClick={handleClick}
      className="bg-zinc-700 w-32 h-32 rounded-xl flex flex-col justify-center text-left"
    >
      <p>
        <b>Sets:</b> {numSets}
      </p>
      <p>
        <b>Date:</b> {formattedDate}
      </p>
    </button>
  );
};

export default SessionBox;
