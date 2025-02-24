import { Set } from "./set.types"

export type Session = {
  exercise: string,
  date: string,
  sets: Set[],
  numSets?: number,
  biggestLoad?: number
}