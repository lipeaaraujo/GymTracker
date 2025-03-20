export type Set = {
  _id: string,
  session: string,
  numReps: number,
  weight: number,
}

export type SetBody = {
  session: string,
  numReps: number,
  weight: number,
}