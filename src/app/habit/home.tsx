import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { router, useNavigation, Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import WeeklyCheckButtons from '../../components/WeeklyCheckButtons'
import Add from '../../components/Add'
import Delete from '../../components/Delete'
import { db } from '../../config'
import { type Habit } from '../../../types/habit'

const handlePress = (): void => {
  router.push('./addHabit')
}

const Home = (): JSX.Element => {
  const [habits, setHabits] = useState<Habit[]>([])

  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Add handlePress={handlePress}/> },
      headerLeft: () => { return <Delete /> }
    })
  }, [])

  useEffect(() => {
    const ref = collection(db, 'habits')
    const q = query(ref, orderBy('updatedAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const remoteHabits: Habit[] = [] // habitsに入れる前の一時的な保存
      snapshot.forEach((doc) => {
        console.log('habits', doc.data())
        const { habitMission, habitMissionDetail, updatedAt } = doc.data()
        remoteHabits.push({
          id: doc.id,
          mission: habitMission,
          missionDetail: habitMissionDetail,
          updatedAt
        })
      })
      setHabits(remoteHabits)
    })
    return unsubscribe
  }, [])

  return (
    <View style={styles.container}>
      { habits.map((habit) => {
        return (
          <View key={habit.id}>
            <Link
              href={{
                pathname: './editHabit',
                params: { id: habit.id }
              }}
              asChild
            >
              <TouchableOpacity style={styles.habitItem}>
                <View style={styles.habitMissionLayout}>
                  <TextInput
                    style={styles.habitMission}
                    key={habit.id}
                    editable={false}
                    value={habit.mission}
                  />
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
    backgroundColor: '#E0F6FF'
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

export default Home
