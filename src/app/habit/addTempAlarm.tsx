import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LayoutAnimation, Platform, ScrollView, StyleSheet, UIManager, View, useWindowDimensions, Text, TouchableOpacity, Alert } from 'react-native'
import { TimerPicker } from 'react-native-timer-picker'
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import Save from '../../components/Save'
import { db } from '../../../src/config'
import type { AlarmTime } from '../../../types/habit'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

enum dayOfWeek { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }

const handleSave = async (habitMission: string, habitMissionDetail: string, alarmTime: AlarmTime, repeatDayOfWeek: boolean[], router): Promise<void> => {
  const refHabitsItemId = await addDoc(collection(db, 'habits'), {
    habitMission,
    habitMissionDetail,
    updatedAt: Timestamp.fromDate(new Date())
  })

  addDoc(collection(db, `habits/${refHabitsItemId.id}/alarms`), {
    alarmTime,
    repeatDayOfWeek,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      // 編集画面に戻る
      // ただし，editHabitに戻る
      // また，追加したアラームを表示する
      // 編集画面では，それまでに遷移した履歴を消去する
      // 戻るボタン  = Home画面に戻る + それまでに遷移した編集履歴を削除する
      router.push({
        pathname: './editAlarm'
      })
    })
    .catch((error) => {
      Alert.alert('アラームを保存できませんでした')
      console.log('エラー；', error)
    })
}

const handlePressRepeatDayOfWeek = (repeatDayOfWeek: boolean[], dayOfWeek: dayOfWeek, setRepeatDayOfWeek: React.Dispatch<React.SetStateAction<any[]>>): void => {
  const updatedRepeatDayOfWeek: boolean[] = [...repeatDayOfWeek]
  updatedRepeatDayOfWeek[dayOfWeek] = (!repeatDayOfWeek[dayOfWeek])
  setRepeatDayOfWeek(updatedRepeatDayOfWeek)
}

const AddTempAlarm = (): JSX.Element => {
  const [alarmTime, setAlarmTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [repeatDayOfWeek, setRepeatDayOfWeek] = useState<boolean[]>(new Array(7).fill(false))
  const { width: windowWidth } = useWindowDimensions()
  const refScrollView = useRef(null)
  const headerNavigation = useNavigation()
  const habitMission = String(useLocalSearchParams().habitMission)
  const habitMissionDetail = String(useLocalSearchParams().habitMission)
  const router = useRouter()

  useEffect(() => {
    headerNavigation.setOptions({
      headerRight: () => { return <Save onSave={() => { handleSave(habitMission, habitMissionDetail, alarmTime, repeatDayOfWeek, router) }}/> }
    })
  }, [alarmTime, repeatDayOfWeek])

  const onMomentumScrollEnd = useCallback(
    () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [windowWidth]
  )

  const renderExample = useMemo(() => {
    return (
      <View style={[styles.alarmTimeScrollViewSection, { width: windowWidth }]}>
        <TimerPicker
          onDurationChange={
            (timer) => {
              setAlarmTime({ hours: timer.hours, minutes: timer.minutes, seconds: 0 })
            }
          }
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
  }, [windowWidth, alarmTime])

  return (
    <View style={styles.container}>

      <View style={styles.alarmTimeSection}>
       <ScrollView
          ref={refScrollView}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={onMomentumScrollEnd}>
          {renderExample}
        </ScrollView>
      </View>

      <View style={styles.repeatDaySection}>
        <Text style={{ fontSize: 24, lineHeight: 24 }}>くり返し</Text>

        <View style = {styles.repeatDay}>
          <TouchableOpacity onPress={() => { handlePressRepeatDayOfWeek(repeatDayOfWeek, dayOfWeek.Sunday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[0] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={ styles.dayText }>日</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatDayOfWeek(repeatDayOfWeek, dayOfWeek.Monday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[1] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>月</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatDayOfWeek(repeatDayOfWeek, dayOfWeek.Tuesday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[2] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>火</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatDayOfWeek(repeatDayOfWeek, dayOfWeek.Wednesday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[3] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>水</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatDayOfWeek(repeatDayOfWeek, dayOfWeek.Thursday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[4] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>木</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatDayOfWeek(repeatDayOfWeek, dayOfWeek.Friday, setRepeatDayOfWeek) }}>
            <View style={ repeatDayOfWeek[5] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>金</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatDayOfWeek(repeatDayOfWeek, dayOfWeek.Saturday, setRepeatDayOfWeek) }}>
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
    alignItems: 'center'
  },
  offRepeatDay: {
    backgroundColor: '#C0C0C0',
    borderWidth: 1,
    height: 32,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayText: {
    fontSize: 23,
    lineHeight: 23
  },
  alarmTimeScrollViewSection: {
    backgroundColor: '#E0F6FF',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  alarmTimeSection: {
    backgroundColor: '#E0F6FF'
  }
})

export default AddTempAlarm
