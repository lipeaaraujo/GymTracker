import { CiCalendar } from "react-icons/ci"
import { GiWeight, GiWeightLiftingUp } from "react-icons/gi"

const SessionInfo = ({ date, numSets, maxLoad }) => {
  return (
    <article className="w-full flex flex-col justify-center gap-2">
      <section className="w-fit flex items-center gap-1">
        <CiCalendar size={28} />
        <p>
          <b>Date:</b> {date}
        </p>
      </section>
      <section className="w-fit flex items-center gap-1">
        <GiWeightLiftingUp size={28} />
        <p>
          <b>Sets:</b> {numSets}
        </p>
      </section>
      <section className="w-fit flex items-center gap-1">
        <GiWeight size={28} />
        <p>
          <b>Biggest Load:</b> {maxLoad} kg
        </p>
      </section>
    </article>
  )
}

export default SessionInfo;