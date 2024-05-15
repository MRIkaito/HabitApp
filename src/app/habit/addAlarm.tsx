import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LayoutAnimation, Platform, ScrollView, StyleSheet, UIManager, View, useWindowDimensions, Text, TouchableOpacity, Alert } from 'react-native'
import { TimerPicker } from 'react-native-timer-picker'
import { router, useNavigation, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import Save from '../../components/Save'
import { db } from '../../../src/config'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

// 日曜日から土曜日までを列挙型でわかりやすくする．
enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }

const handleSave = (alarmTime, repeatWeeks, habitItemId): void => {
  addDoc(collection(db, 'habits', habitItemId, 'repeats'), {
    alarmTime,
    repeatWeeks,
    updatedAt: Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch((error) => {
      Alert.alert('保存できませんでした')
      console.log(error)
    })
}

const handlePressRepeatWeek = (repeatWeeks: boolean[], day: Day, setRepeatWeeks: React.Dispatch<React.SetStateAction<any[]>>): void => {
  const updatedRepeatWeek: boolean[] = [...repeatWeeks]
  updatedRepeatWeek[day] = (!repeatWeeks[day])
  setRepeatWeeks(updatedRepeatWeek)
}

const Alarm = (): JSX.Element => {
  const id = String(useLocalSearchParams().id)
  const [alarmTime, setAlarmTime] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [repeatWeeks, setRepeatWeeks] = useState(new Array(7).fill(false))
  const headerNavigation = useNavigation()
  const { width: windowWidth } = useWindowDimensions()
  const scrollViewRef = useRef(null)

  useEffect(() => {
    headerNavigation.setOptions({
      headerRight: () => { return <Save onSave={() => { handleSave(alarmTime, repeatWeeks, id) }}/> }
    })
  }, [alarmTime, repeatWeeks])

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
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={onMomentumScrollEnd}>
          {renderExample}
        </ScrollView>
      </View>

      <View style={styles.repeatDaySection}>
        <Text style={{ fontSize: 24, lineHeight: 24 }}>くり返し</Text>

        <View style = {styles.repeatDay}>
          <TouchableOpacity onPress={() => { handlePressRepeatWeek(repeatWeeks, Day.Sunday, setRepeatWeeks) }}>
            <View style={ repeatWeeks[0] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={ styles.dayText }>日</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatWeek(repeatWeeks, Day.Monday, setRepeatWeeks) }}>
            <View style={ repeatWeeks[1] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>月</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatWeek(repeatWeeks, Day.Tuesday, setRepeatWeeks) }}>
            <View style={ repeatWeeks[2] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>火</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatWeek(repeatWeeks, Day.Wednesday, setRepeatWeeks) }}>
            <View style={ repeatWeeks[3] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>水</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatWeek(repeatWeeks, Day.Thursday, setRepeatWeeks) }}>
            <View style={ repeatWeeks[4] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>木</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatWeek(repeatWeeks, Day.Friday, setRepeatWeeks) }}>
            <View style={ repeatWeeks[5] ? styles.onRepeatDay : styles.offRepeatDay }>
              <Text style={styles.dayText}>金</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { handlePressRepeatWeek(repeatWeeks, Day.Saturday, setRepeatWeeks) }}>
            <View style={ repeatWeeks[6] ? styles.onRepeatDay : styles.offRepeatDay }>
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

export default Alarm
