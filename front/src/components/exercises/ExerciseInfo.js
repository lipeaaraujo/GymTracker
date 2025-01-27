import { CgGym } from "react-icons/cg"
import { GiWeight } from "react-icons/gi";

const ExerciseInfo = ({ name, description, personalBest }) => {
  return (
    <article className="flex flex-col gap-2">
      <header className="w-full flex justify-center items-center gap-2">
        <CgGym size={28} />
        <h2>{name}</h2>
      </header>
      <section className="w-full flex justify-center">
        <p className="bg-neutral-900 w-96 p-2 rounded-xl text-wrap break-words">
          <b>Description:</b> {description}
        </p>
      </section>
      <footer className="w-full flex justify-center items-center gap-1">
        <GiWeight size={28} />
        <p>
          <b>Personal Best:</b> {personalBest} kg
        </p>
      </footer>
    </article>
  )
}

export default ExerciseInfo;