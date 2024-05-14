import { Text, View, TextInput, StyleSheet, Alert } from 'react-native'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

import NotifyItem from '../../components/NotifyItem'
import HabitWeekLog from '../../components/HabitWeekLog'
import Save from '../../components/Save'
import { db } from '../../config'

const handlePress = (id: string, habitMission: string, habitMissionDetail: string): void => {
  const ref = doc(db, 'habits', id)
  setDoc(ref, {
    habitMission,
    habitMissionDetail,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch(() => {
      Alert.alert('更新に失敗しました')
    })
}

const EditHabit = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [habitMission, setHabitMission] = useState('')
  const [habitMissionDetail, setHabitMissionDetail] = useState('')

  useEffect(() => {
    const ref = doc(db, 'habits', id)
    getDoc(ref)
      .then((docRef) => {
        const RemoteHabitMission: string = docRef?.data()?.habitMission
        const RemoteHabitMissionDetail: string = docRef?.data()?.habitMissionDetail

        setHabitMission(RemoteHabitMission)
        setHabitMissionDetail(RemoteHabitMissionDetail)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Save handlePress={() => { handlePress(id, habitMission, habitMissionDetail) }}/> }
    })
  }, [habitMission, habitMissionDetail])

  return (
    <View style = {styles.container}>
      {/* 習慣化目標 */}
      <View style={styles.habitLog}>
        <View style={styles.habitMissionLayout}>
          <TextInput
            style={styles.habitMission}
            editable={true}
            value={habitMission}
            onChangeText={(habitMission) => { setHabitMission(habitMission) }}
          />
        </View>
        <HabitWeekLog />
        <HabitWeekLog />
        <HabitWeekLog />
        <HabitWeekLog />
      </View>

      <View style={styles.habitMissionDetailSection}>
      <Text style={styles.habitMissionDetailDescription}>詳細</Text>
      <TextInput
        editable = { true }
        placeholder = "例)仕事から帰ってきたらすぐに走りに行く！"
        multiline = { true }
        numberOfLines = { 4 }
        style = {styles.habitMissionDetail}
        value={habitMissionDetail}
        onChangeText = {(habitMissionDetail) => { setHabitMissionDetail(habitMissionDetail) }}
      />
    </View>

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
  },
  habitMissionLayout: {
    justifyContent: 'center',
    height: 48,
    width: 336
  },
  habitMission: {
    fontSize: 24,
    lineHeight: 24
  }
})

export default EditHabit
