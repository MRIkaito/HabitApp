import { type Timestamp } from 'firebase/firestore'

interface Habit {
  habitItemId: string
  habitMission: string
  habitMissionDetail: string
  updatedAt: Timestamp
}

interface HabitItemAlarm {
  alarmId: string
  alarmTime: AlarmTime
  repeatDayOfWeek: boolean[]
  updatedAt: Timestamp
}

interface AlarmTime {
  hours: number
  minutes: number
  seconds: number
}

export type { Habit, HabitItemAlarm, AlarmTime }
