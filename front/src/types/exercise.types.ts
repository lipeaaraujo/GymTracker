import { Session } from "./session.types"

export type Exercise = {
  id: string,
  name: string,
  description: string,
  sessions: Session[],
  personalBest?: number
}