import { useEffect, useState } from 'react'
import { Text, TextInput, View, StyleSheet, Alert } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import NotifyItem from '../../components/NotifyItem'
import Save from '../../components/Save'
import { db } from '../../../src/config'

const handleSave = (habitMission: string, habitMissionDetail: string): void => {
  addDoc(collection(db, 'habits'), {
    habitMission,
    habitMissionDetail,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch((error) => {
      Alert.alert('追加できませんでした')
      console.log(error)
    })
}

const AddHabit = (): JSX.Element => {
  const [habitMission, setHabitMission] = useState('')
  const [habitMissionDetail, setHabitMissionDetail] = useState('')
  const headerNavigation = useNavigation()

  useEffect(() => {
    headerNavigation.setOptions({
      headerRight: () => { return <Save onSave= {() => { handleSave(habitMission, habitMissionDetail) }}/> }
    })
  }, [habitMission, habitMissionDetail])

  return (
  <View style = {styles.container}>
    <View style={styles.habitMissionSection}>
      <Text style={styles.habitMissionDescription}>習慣化したいことはなんですか？</Text>
      <TextInput
        onChangeText = {(mission) => { setHabitMission(mission) }}
        value = { habitMission }
        placeholder=" 例)毎日15分ランニング！"
        maxLength={16}
        editable = {true}
        style = {styles.habitMissionTextInput}
      />
    </View>

    <View style={styles.habitMissionDetailSection}>
      <Text style={styles.habitMissionDetailDescription}>詳細</Text>
      <TextInput
        onChangeText = {(missionDetail) => { setHabitMissionDetail(missionDetail) }}
        placeholder = "例)仕事から帰ってきたらすぐに走りに行く！"
        maxLength={70}
        editable = { true }
        multiline = { true }
        numberOfLines = { 4 }
        style = {styles.habitMissionDetailTextInput}
      />
    </View>

    <NotifyItem />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  habitMissionDetailTextInput: {
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
