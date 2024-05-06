import { type Timestamp } from 'firebase/firestore'

interface Habit {
  id: string
  mission: string
  missionDetail: string
  updatedAt: Timestamp
}

export type { Habit }
