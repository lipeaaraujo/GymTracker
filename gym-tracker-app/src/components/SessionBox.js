import { useState } from "react";
import { CiCalendar } from "react-icons/ci";

const SessionBox = ({ session, handleClick }) => {
  const date = new Date(session.date);

  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  })

  return (
    <button
      onClick={handleClick}
      className="bg-zinc-700 w-32 h-32 rounded-xl flex flex-col justify-center text-left"
    >
      <p>
        <b>Sets:</b> {session.numSets}
      </p>
      <p>
        <b>Date:</b> {f.format(date)}
      </p>
    </button>
  );
};

export default SessionBox;
