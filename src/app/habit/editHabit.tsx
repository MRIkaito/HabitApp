import { useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import { Link, router, useNavigation, useLocalSearchParams } from 'expo-router'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import HabitWeekLog from '../../components/HabitWeekLog'
import Icon from '../../components/Icon'
import Save from '../../components/Save'
import { db } from '../../config'

const handlePressToAddAlarmScreen = (): void => {
  router.push('./addAlarm')
}

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
  const [habitMission, setHabitMission] = useState('')
  const [habitMissionDetail, setHabitMissionDetail] = useState('')
  const habitsItemId = String(useLocalSearchParams().id)
  const headerNavigation = useNavigation()

  useEffect(() => {
    const refHabitsItem = doc(db, 'habits', habitsItemId)
    getDoc(refHabitsItem)
      .then((refHabitsItem) => {
        const RemoteHabitMission: string = refHabitsItem?.data()?.habitMission
        const RemoteHabitMissionDetail: string = refHabitsItem?.data()?.habitMissionDetail
        setHabitMission(RemoteHabitMission)
        setHabitMissionDetail(RemoteHabitMissionDetail)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    headerNavigation.setOptions({
      headerRight: () => { return <Save onSave={() => { handlePress(habitsItemId, habitMission, habitMissionDetail) }}/> }
    })
  }, [habitMission, habitMissionDetail])

  return (
    <View style = {styles.container}>
      {/* 習慣化目標 */}
      <View style={styles.habitMissionAndHabitLogSection}>
        <View style={styles.habitMissionSection}>
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

    {/* 通知セクション */}
    <View style={styles.alarmSection}>
      {/* 通知ヘッダ・通知追加 */}
      <View style={styles.alarmDescription}>
        <Text style={styles.alarmText}>通知</Text>
        <TouchableOpacity style={styles.addButton} onPress={handlePressToAddAlarmScreen}>
          <Text style={styles.addButtonPlus}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* 通知アイテム */}
      <Link href='/habit/alarm' asChild>
        <TouchableOpacity style={styles.alarmItem}>
          <View>
            <Text style={styles.alarmTime}>10:15</Text>
            <Text style={styles.repeatWeek}>くり返し：(月)(金)</Text>
          </View>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Icon iconName='DeleteNotify' iconColor='#D9D9D9' />
          </TouchableOpacity>
        </TouchableOpacity>
      </Link>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  },
  habitMissionAndHabitLogSection: {
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
  habitMissionSection: {
    justifyContent: 'center',
    height: 48,
    width: 336
  },
  habitMission: {
    fontSize: 24,
    lineHeight: 24
  },
  alarmSection: {
    paddingLeft: 24,
    paddingRight: 24
  },
  alarmDescription: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  alarmText: {
    lineHeight: 40,
    fontSize: 24,
    marginRight: 16
  },
  alarmItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    height: 80,
    width: 336,
    paddingLeft: 8,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  alarmTime: {
    lineHeight: 56,
    fontSize: 44
  },
  repeatWeek: {
    lineHeight: 24,
    fontSize: 20
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderColor: '#0085ff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonPlus: {
    color: '#0085ff',
    fontSize: 24,
    fontWeight: '700'
  }
})

export default EditHabit
