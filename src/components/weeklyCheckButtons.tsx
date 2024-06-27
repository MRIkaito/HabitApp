import { View, StyleSheet } from 'react-native'
import DayCheckButton from './DayCheckButton'
import { auth } from '../config'
import { type Habit } from '../../types/habit'

interface Props {
  habitItem: Habit
  habitItemId: string
  achievements: Array<{
    year: number
    month: number
    day: number
    dayOfWeek: number
    achievement: boolean
  }>
}

const WeeklyCheckButtons = (props: Props): JSX.Element => {
  const { habitItem, habitItemId, achievements } = props
  if (auth.currentUser === null) {
    console.log('ユーザーログインがされていません')
    return <></>
  }

  // 最古のachievementsの曜日
  const earliestAchievementsDayOfWeek: number = achievements[0].dayOfWeek
  // 最新のachievementsの曜日
  const latestAchievementsDayOfWeek: number = achievements[achievements.length - 1].dayOfWeek
  // achievementログを掃き溜めるための配列
  const firstAchievement: JSX.Element[] = []
  const secondAchievement: JSX.Element[] = []
  const thirdAchievement: JSX.Element[] = []

  if (achievements.length < 7) {
    // 最古のログの曜日(数値)よりも最新のログの曜日(数値)の方が大きい・または同じ
    if (achievements[0].dayOfWeek <= achievements[achievements.length - 1].dayOfWeek) {
      for (let i = 0; i < earliestAchievementsDayOfWeek; i++) {
        firstAchievement.unshift(<DayCheckButton />)
      }
      for (let i = 0; i <= (latestAchievementsDayOfWeek - earliestAchievementsDayOfWeek); i++) {
        secondAchievement.unshift(<DayCheckButton
          habitItem = {habitItem}
          habitItemId = {habitItemId}
          achievementsIndex = {achievements.length - 1 - i}
          achievementLog = {achievements[achievements.length - 1 - i].achievement}
          achievements = {achievements}
        />)
      }
      for (let i = 0; i < (6 - latestAchievementsDayOfWeek); i++) {
        thirdAchievement.unshift(<DayCheckButton />)
      }
      return (
        <View style={styles.weeklyCheckButtons}>
          {firstAchievement}
          {secondAchievement}
          {thirdAchievement}
        </View>
      )
    // 最古いのログの曜日(数値)よりも最新のログの曜日(数値)の方が小さい
    } else {
      for (let i = 0; i <= latestAchievementsDayOfWeek; i++) {
        firstAchievement.unshift(<DayCheckButton
          habitItem = {habitItem}
          habitItemId = {habitItemId}
          achievementsIndex = {achievements.length - 1 - i}
          achievementLog = {achievements[achievements.length - 1 - i].achievement}
          achievements = {achievements}
        />)
      }
      for (let i = 0; i < (6 - latestAchievementsDayOfWeek); i++) {
        secondAchievement.unshift(<DayCheckButton />)
      }
      return (
        <View style={styles.weeklyCheckButtons}>
          {firstAchievement}
          {secondAchievement}
        </View>
      )
    }
  } else {
    for (let i = 0; i <= latestAchievementsDayOfWeek; i++) {
      firstAchievement.unshift(<DayCheckButton
        habitItem = {habitItem}
        habitItemId = {habitItemId}
        achievementsIndex = {achievements.length - 1 - i}
        achievementLog = {achievements[achievements.length - 1 - i].achievement}
        achievements = {achievements}
      />)
    }
    for (let i = 0; i < (6 - latestAchievementsDayOfWeek); i++) {
      secondAchievement.unshift(<DayCheckButton />)
    }

    return (
      <View style={styles.weeklyCheckButtons}>
        {firstAchievement}
        {secondAchievement}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  weeklyCheckButtons: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default WeeklyCheckButtons
