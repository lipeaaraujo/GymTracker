import { Set } from "./set.types"

export type Session = {
  _id: string
  exercise: string,
  date: string,
  sets: Set[],
  numSets?: number,
  biggestLoad?: number
}

export type SessionBody = {
  exercise: string,
  date: string,
}