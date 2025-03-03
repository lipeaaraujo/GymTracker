import { Session } from "./session.types"

export type Exercise = {
  _id: string,
  name: string,
  description: string,
  sessions: Session[],
  personalBest?: number
}