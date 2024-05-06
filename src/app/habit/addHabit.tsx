import { Text, TextInput, View, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'

import NotifyItem from '../../components/NotifyItem'
import Save from '../../components/Save'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../../src/config'

const handlePress = (habitMission: string, habitMissionDetail: string): void => {
  addDoc(collection(db, 'habits'), {
    habitMission,
    habitMissionDetail,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const AddHabit = (): JSX.Element => {
  const [habitMission, setHabitMission] = useState('')
  const [habitMissionDetail, setHabitMissionDetail] = useState('')
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Save handlePress= {() => { handlePress(habitMission, habitMissionDetail) }}/> }
    })
  }, [habitMission, habitMissionDetail])

  return (
  <View style = {styles.container}>
    <View style={styles.habitMissionSection}>
      <Text style={styles.habitMissionDescription}>習慣化したいことはなんですか？</Text>
      <TextInput
        placeholder=" 例)毎日15分ランニング！"
        maxLength={16}
        editable = {true}
        value = { habitMission }
        onChangeText = {(mission) => { setHabitMission(mission) }}
        style = {styles.habitMissionTextInput}
      />
    </View>

    <View style={styles.habitMissionDetailSection}>
      <Text style={styles.habitMissionDetailDescription}>詳細</Text>
      <TextInput
        placeholder = "例)仕事から帰ってきたらすぐに走りに行く！"
        maxLength={70}
        editable = { true }
        multiline = { true }
        numberOfLines = { 4 }
        onChangeText = {(missionDetail) => { setHabitMissionDetail(missionDetail) }}
        style = {styles.habitMissionDetail}
      />
    </View>

    <NotifyItem />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  },
  habitMissionSection: {
    flexDirection: 'column',
    width: 390,
    height: 80,
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 16
  },
  habitMissionDescription: {
    fontSize: 23,
    lineHeight: 23
  },
  habitMissionTextInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    height: 48,
    width: 336,
    lineHeight: 24,
    fontSize: 24
  },
  habitMissionDetailSection: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 16
  },
  habitMissionDetailDescription: {
    fontSize: 24,
    lineHeight: 32
  },
  habitMissionDetail: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    height: 136,
    width: 336,
    lineHeight: 24,
    fontSize: 24
  }
})

export default AddHabit
