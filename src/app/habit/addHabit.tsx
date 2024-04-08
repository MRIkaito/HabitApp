import { View, StyleSheet } from 'react-native'

import HabitMissionTextInput from '../../components/habitMissionTextInput'
import HabitMissionDetail from '../../components/habitMissionDetail'
import NotifyItem from '../../components/notifyItem'
import Header from '../../components/header'

const AddHabit = (): JSX.Element => {
  return (
  // 画面全体
  <View style = {styles.container}>
      <Header status ={false} />

    <HabitMissionTextInput />

    <HabitMissionDetail />

    <NotifyItem />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  }
})

export default AddHabit
