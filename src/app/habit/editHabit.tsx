import { View, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'

import HabitMission from '../../components/HabitMission'
import HabitMissionDetail from '../../components/HabitMissionDetail'
import NotifyItem from '../../components/NotifyItem'
import HabitWeekLog from '../../components/HabitWeekLog'
import Save from '../../components/Save'

const handlePress = (): void => {
  router.back()
}

const EditHabit = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Save handlePress={handlePress}/> }
    })
  }, [])

  return (
    <View style = {styles.container}>
      {/* 習慣化目標 */}
      <View style={styles.habitLog}>
        <HabitMission>ジョギング</HabitMission>
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
