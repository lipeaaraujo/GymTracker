import { Session } from "./session.types"

export type Exercise = {
  _id: string,
  user: string,
  name: string,
  description: string,
  sessions: Session[],
  personalBest?: number
}

export type ExerciseBody = {
  user: string,
  name: string,
  description: string
}