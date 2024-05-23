import { useState, useEffect } from 'react'
import { Text, View, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native'
import { Link, router, useNavigation, useLocalSearchParams } from 'expo-router'
import { doc, getDoc, setDoc, Timestamp, collection, query, orderBy, onSnapshot, deleteDoc } from 'firebase/firestore'
import HabitWeekLog from '../../components/HabitWeekLog'
import Icon from '../../components/Icon'
import Save from '../../components/Save'
import { db } from '../../config'
import { type HabitItemAlarm } from '../../../types/habit'

const handleSave = (habitItemId: string, habitMission: string, habitMissionDetail: string): void => {
  const ref = doc(db, 'habits', habitItemId)
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

const handleDelete = (habitItemId: string, alarmId: string): void => {
  const refAlarmItem = doc(db, `habits/${habitItemId}/alarms`, alarmId)

  Alert.alert('削除します', 'よろしいですか？', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: () => {
        deleteDoc(refAlarmItem)
          .catch(() => { Alert.alert('削除に失敗しました') })
      }
    }
  ])
}

const EditHabit = (): JSX.Element => {
  const [alarmItems, setAlarmItems] = useState<HabitItemAlarm[]>([])
  const [habitMission, setHabitMission] = useState('')
  const [habitMissionDetail, setHabitMissionDetail] = useState('')
  const habitItemId = String(useLocalSearchParams().habitItemId)
  const headerNavigation = useNavigation()

  useEffect(() => {
    headerNavigation.setOptions({
      headerRight: () => { return <Save onSave={() => { handleSave(habitItemId, habitMission, habitMissionDetail) }}/> }
    })
  }, [habitMission, habitMissionDetail])

  useEffect(() => {
    const refHabitItem = doc(db, 'habits', habitItemId)
    getDoc(refHabitItem)
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
    const refAlarmItems = collection(db, `habits/${habitItemId}/alarms`)
    const queryAlarmItems = query(refAlarmItems, orderBy('alarmTime.hours', 'desc'))
    const unsubscribeEditHabitScreen = onSnapshot(queryAlarmItems, (snapshot) => {
      const remoteAlarmItems: HabitItemAlarm[] = []

      snapshot.forEach((docAlarmItems) => {
        console.log('', docAlarmItems.data())
        const { alarmTime, repeatDayOfWeek, updatedAt } = docAlarmItems.data()
        remoteAlarmItems.push({
          alarmId: docAlarmItems.id,
          alarmTime: { hours: alarmTime.hours, minutes: alarmTime.minutes, seconds: alarmTime.seconds },
          repeatDayOfWeek,
          updatedAt
        })
      })
      setAlarmItems(remoteAlarmItems)
    })
    return unsubscribeEditHabitScreen
  }, [])

  return (
    <ScrollView style = {styles.container}>
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

      <View style={styles.alarmSection}>
        <View style={styles.alarmDescription}>
          <Text style={styles.alarmText}>通知</Text>
          <Link href={{ pathname: './addAlarm', params: { habitItemId } }}>
            <View style={styles.addButton}>
              <Text style={styles.addButtonPlus}>+</Text>
            </View>
          </Link>
        </View>

        { alarmItems.map((alarmItem) => {
          return (
            <View key={alarmItem.alarmId}>
              <Link href={{ pathname: './editAlarm', params: { habitItemId, alarmId: alarmItem.alarmId }}}>

              <View style={styles.alarmItem}>
                <View>
                  <Text style={styles.alarmTime}>
                    {(alarmItem.alarmTime.hours).toString()}:{(alarmItem.alarmTime.minutes).toString().padStart(2, '0')}
                  </Text>
                  <Text style={styles.repeatWeek}>
                    くりかえし：
                    {alarmItem.repeatDayOfWeek[0] && '(日)'}
                    {alarmItem.repeatDayOfWeek[1] && '(月)'}
                    {alarmItem.repeatDayOfWeek[2] && '(火)'}
                    {alarmItem.repeatDayOfWeek[3] && '(水)'}
                    {alarmItem.repeatDayOfWeek[4] && '(木)'}
                    {alarmItem.repeatDayOfWeek[5] && '(金)'}
                    {alarmItem.repeatDayOfWeek[6] && '(土)'}
                  </Text>
                </View>
                <TouchableOpacity style={{ marginRight: 16 }} onPress={() => { handleDelete(habitItemId, alarmItem.alarmId)}}>
                  <Icon iconName='DeleteNotify' iconColor='#D9D9D9' />
                </TouchableOpacity>
              </View>

              </Link>
            </View>
          )
        })}
      </View>
    </ScrollView>
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
