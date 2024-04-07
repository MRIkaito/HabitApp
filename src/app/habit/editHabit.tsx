import { View, StyleSheet } from 'react-native'
import Header from '../../components/header'

import HabitMission from '../../components/habitMission'
import HabitMissionDetail from '../../components/habitMissionDetail'
import NotifyItem from '../../components/notifyItem'
import HabitWeekLog from '../../components/habitWeekLog'

const EditHabit = (): JSX.Element => {
  return (
    <View style = {styles.container}>
      <Header />

      {/* 習慣化目標 */}
      <View style={styles.habitLog}>
        <HabitMission />
        <HabitWeekLog />
        <HabitWeekLog />
        <HabitWeekLog />
        <HabitWeekLog />
      </View>

      {/* 詳細 */}
      <HabitMissionDetail />

      {/* 通知 */}
      <NotifyItem />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  },
  habitLog: {
    paddingLeft: 27,
    paddingRight: 27,
    marginBottom: 8
  }
})

export default EditHabit
