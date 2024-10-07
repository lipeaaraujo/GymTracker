
function ViewExercise() {

  const exercise = {
    name: "Legpress",
    sets: [
      {
        load: 150.0,
        date: "07-10-2024",
      },
      {
        load: 165.0,
        date: "14-10-2024",
      }
    ]
  }

  return (
    <div>
      <header className="w-full m-auto text-center text-xl">
        {exercise.name}
      </header>
      <div className="flex flex-row gap-4 flex-wrap">
        {exercise.sets.map((set) => (
          <div className="bg-zinc-700 w-32 h-32 rounded-xl">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <p>{set.load} kg</p>
              <p>{set.date}</p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default ViewExercise;