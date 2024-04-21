import { View, StyleSheet } from 'react-native'

import HabitDayLog from './HabitDayLog'

const HabitWeekLog = (): JSX.Element => {
  return (
    <View style={styles.habitWeekLog}>
      <HabitDayLog />
      <HabitDayLog />
      <HabitDayLog />
      <HabitDayLog />
      <HabitDayLog />
      <HabitDayLog />
      <HabitDayLog />
    </View>
  )
}

const styles = StyleSheet.create({
  habitWeekLog: {
    flexDirection: 'row'
  }
})

export default HabitWeekLog
