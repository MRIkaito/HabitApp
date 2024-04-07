import { View, StyleSheet } from 'react-native'
import DayCheckButton from './dayCheckButton'

const WeeklyCheckButtons = (): JSX.Element => {
  return (
    <View style={styles.weeklyCheckButtons}>
      <DayCheckButton />
      <DayCheckButton />
      <DayCheckButton />
      <DayCheckButton />
      <DayCheckButton />
      <DayCheckButton />
      <DayCheckButton />
    </View>
  )
}

const styles = StyleSheet.create({
  weeklyCheckButtons: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default WeeklyCheckButtons
