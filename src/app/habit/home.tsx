import React, { useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { router, useNavigation, Link } from 'expo-router'
import { doc, collection, onSnapshot, query, orderBy, deleteDoc, getDocs } from 'firebase/firestore'
import * as Notifications from 'expo-notifications'
import Add from '../../components/Add'
import Icon from '../../components/Icon'
import WeeklyCheckButtons from '../../components/WeeklyCheckButtons'
import { db } from '../../config'
import { type Habit } from '../../../types/habit'

const handleAdd = (): void => {
  router.push('./addHabit')
}

const handleDelete = async (habitItemId: string): Promise<void> => {
  // habitsコレクションの，指定のID(habitItemId)のドキュメントを参照を取得
  const refHabitItem = doc(db, 'habits', habitItemId)
  // alarmsコレクションへの参照を取得
  const refHabitAlarmCollection = collection(refHabitItem, 'alarms')
  // alarmsコレクション中のドキュメントをすべて取得
  const refHabitAlarmId = await getDocs(refHabitAlarmCollection)

  Alert.alert('削除します', 'よろしいですか？', [
    {
      text: 'キャンセル'
    },
    {
      text: '削除する',
      style: 'destructive',
      onPress: () => {
        deleteDoc(refHabitItem)
          .catch(() => { Alert.alert('削除に失敗しました') })

        refHabitAlarmId.forEach((doc) => {
          doc.data().alarmIdentifier.forEach((alarmIdentifier: null | string) => {
            if (alarmIdentifier === null) {
              // DO NOTHING
            } else {
              Notifications.cancelScheduledNotificationAsync(alarmIdentifier)
                .then(() => { console.log('.then実行') })
                .catch((error) => { console.log('error:', error) })
            }
          })
        })
      }
    }
  ])
}

const Home = (): JSX.Element => {
  const [habitItems, setHabits] = useState<Habit[]>([])
  const headerNavigation = useNavigation()

  useEffect(() => {
    headerNavigation.setOptions({
      headerRight: () => { return <Add onAdd={handleAdd}/> }
    })
  }, [])

  useEffect(() => {
    const refHabits = collection(db, 'habits')
    const queryHabits = query(refHabits, orderBy('updatedAt', 'desc'))

    const unsubscribeHomeScreen = onSnapshot(queryHabits, (snapshot) => {
      const remoteHabits: Habit[] = [] // habitsに入れる前の一時的な保存
      snapshot.forEach((docHabits) => {
        console.log('habits', docHabits.data())
        const { habitMission, habitMissionDetail, updatedAt } = docHabits.data()
        remoteHabits.push({
          habitItemId: docHabits.id,
          habitMission,
          habitMissionDetail,
          updatedAt
        })
      })
      setHabits(remoteHabits)
    })
    return unsubscribeHomeScreen
  }, [])

  return (
    <View style={styles.container}>
      { habitItems.map((habitItem) => {
        return (
          <View key={habitItem.habitItemId}>
            <Link href={{ pathname: './editHabit', params: { habitItemId: habitItem.habitItemId } }} asChild>
              <TouchableOpacity style={styles.habitItem}>
                <View style={styles.habitMissionAndhabitLog}>
                  <TextInput
                    style={styles.habitMission}
                    key={habitItem.habitItemId}
                    editable={false}
                    value={habitItem.habitMission}
                  />
                <TouchableOpacity
                  style={ styles.deleteHabitItemButton }
                  onPress={() => {
                    handleDelete(habitItem.habitItemId)
                      .then(() => {})
                      .catch((error: string) => { console.log(error)})
                  }} >
                  <Icon iconName='DeleteNotify' iconColor='#D9D9D9' />
                </TouchableOpacity>
                </View>
                <WeeklyCheckButtons />
              </TouchableOpacity>
            </Link>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF',
    alignItems: 'center'
  },
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
  },
  habitMissionAndhabitLog: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    width: 336
  },
  habitMission: {
    fontSize: 24,
    lineHeight: 24
  },
  deleteHabitItemButton: {
    position: 'absolute',
    top: 0,
    right: 0
  }
})

export default Home
