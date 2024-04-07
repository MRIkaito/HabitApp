import { View, StyleSheet } from 'react-native'
import WeeklyCheckButtons from './weeklyCheckButtons'
import HabitMission from './habitMission'

const HabitItem = (): JSX.Element => {
  return (
    <View style={styles.habitItem}>
      <HabitMission />

      <WeeklyCheckButtons />
    </View>
  )
}

const styles = StyleSheet.create({
  habitItem: {
    backgroundColor: '#CCF0FF',
    height: 80,
    width: 390,
    paddingLeft: 24,
    paddingRight: 30,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 5 }
  }
})

export default HabitItem
