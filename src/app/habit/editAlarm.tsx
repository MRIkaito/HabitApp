import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LayoutAnimation, Platform, ScrollView, StyleSheet, UIManager, View, useWindowDimensions, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { TimerPicker } from 'react-native-timer-picker'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import Save from '../../components/Save'
import { db } from '../../../src/config'
import type { AlarmTime } from '../../../types/habit'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }

// Firestoreに保存する
const handleSave = (alarmTime: AlarmTime, repeatDayOfWeek: boolean[], habitItemId: string, alarmId: string): void => {
  const refHabitAlarm = doc(db, `habits/${habitItemId}/alarms`, alarmId)
  setDoc(refHabitAlarm, {
    alarmTime,
    repeatDayOfWeek,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch(() => {
      Alert.alert('更新に失敗しました！')
    })
}

// 繰り返し曜日を決めるイベントハンドラ
const handlePress = (repeatDayOfWeek: boolean[], day: Day, setRepeatDayOfWeek: React.Dispatch<React.SetStateAction<any[]>>): void => {
  const updatedRepeatDayOfWeek: boolean[] = [...repeatDayOfWeek]
  updatedRepeatDayOfWeek[day] = (!repeatDayOfWeek[day])
  setRepeatDayOfWeek(updatedRepeatDayOfWeek)
}

const EditAlarm = (): JSX.Element => {
  const habitItemId = String(useLocalSearchParams().habitItemId)
  const alarmId = String(useLocalSearchParams().alarmId)
  const [alarmTime, setAlarmTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [repeatDayOfWeek, setRepeatDayOfWeek] = useState<boolean[]>(new Array(7).fill(false))
  const { width: windowWidth } = useWindowDimensions()
  const refScrollView = useRef(null)
  const headerNavigation = useNavigation()

  // データローディングの状態
  const [loading, setLoading] = useState(true)

  const onMomentumScrollEnd = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [windowWidth])

  useEffect(() => {
    const refHabitAlarm = doc(db, `habits/${habitItemId}/alarms`, alarmId)
    getDoc(refHabitAlarm)
      .then((docHabitsAlarms) => {
        const RemoteRepeatTimer: AlarmTime = docHabitsAlarms?.data()?.alarmTime
        const RemoteRepeatDayOfWeek: boolean[] = docHabitsAlarms?.data()?.repeatDayOfWeek
        setAlarmTime(RemoteRepeatTimer)
        setRepeatDayOfWeek(RemoteRepeatDayOfWeek)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    headerNavigation.setOptions({
      headerRight: () => { return <Save onSave={() => { handleSave(alarmTime, repeatDayOfWeek) }}/> }
    })
  }, [alarmTime, repeatDayOfWeek])

  const renderExample = (hour: number, minute: number): JSX.Element => {
    return (
      <View style={[styles.alarmTimeScrollViewSection, { width: windowWidth }]}>
        <TimerPicker
          onDurationChange={
            (timer) => {
              setAlarmTime({ hours: timer.hours, minutes: timer.minutes, seconds: 0 })
            }
          }
          aggressivelyGetLatestDuration={true}
          initialHours = {hour}
          initialMinutes = {minute}
          hideSeconds={true}
          padWithNItems={2}
          hourLabel = "時"
          minuteLabel = "分"
          LinearGradient={LinearGradient}
          styles={{
            theme: 'light',
            backgroundColor: '#E0F6FF',
            pickerItem: {
              fontSize: 28
            },
            pickerLabel: {
              fontSize: 26,
              marginTop: 0
            },
            pickerContainer: {
              marginRight: 6
            }
          }}
        />
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
      <View style={styles.alarmTimeSection}>
      {/* <ScrollView
        ref={refScrollView}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {renderExample(alarmTime.hours, alarmTime.minutes)}
      </ScrollView> */}
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>

      <View style={styles.repeatDaySection}>
        <Text style={{ fontSize: 24, lineHeight: 24 }}>くり返し</Text>

        <View style = {styles.repeatDay}>
          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Sunday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[0] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={ styles.dayText }>日</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Monday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[1] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>月</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Tuesday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[2] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>火</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Wednesday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[3] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>水</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Thursday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[4] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>木</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Friday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[5] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>金</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Saturday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[6] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>土</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.alarmTimeSection}>
      <ScrollView
        ref={refScrollView}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {renderExample(alarmTime.hours, alarmTime.minutes)}
      </ScrollView>
        </View>

      <View style={styles.repeatDaySection}>
        <Text style={{ fontSize: 24, lineHeight: 24 }}>くり返し</Text>

        <View style = {styles.repeatDay}>
          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Sunday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[0] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={ styles.dayText }>日</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Monday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[1] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>月</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Tuesday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[2] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>火</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Wednesday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[3] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>水</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Thursday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[4] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>木</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Friday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[5] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>金</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePress(repeatDayOfWeek, Day.Saturday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[6] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>土</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  },
  alarmSection: {
    height: 152,
    width: 384,
    marginTop: 104,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  repeatDaySection: {
    paddingLeft: 27,
    paddingRight: 27
  },
  repeatDay: {
    flexDirection: 'row'
  },
  onRepeatDay: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    height: 32,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  offRepeatDay: {
    backgroundColor: '#C0C0C0',
    borderWidth: 1,
    height: 32,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dayText: {
    fontSize: 23,
    lineHeight: 23
  },
  alarmTimeScrollViewSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  alarmTimeSection: {
    backgroundColor: '#E0F6FF'
  }
})

export default EditAlarm
















// 以下，テスト
// import { ActivityIndicator, Text, View } from 'react-native'
// import { useEffect, useState } from 'react'

// const fetchData = async () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("Fetched Data")
//     }, 2000)
//   })
// }

// const EditAlarm = (): JSX.Element => {
//   const [data, setData] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const getData = async () => {
//       const result = await fetchData()
//       setData(result as string)
//       setLoading(false)
//     }

//     getData()
//   }, [])

//   if (loading) {
//     return (
//       <View>
//         {console.log('1番目?')}
//         <ActivityIndicator size="large" color="#0000ff"/>
//       </View>
//     )
//   }

//   return (
//     <View>
//       {console.log('2番目?')}
//       <Text>{data}</Text>
//     </View>
//   )
// }


// export default EditAlarm
