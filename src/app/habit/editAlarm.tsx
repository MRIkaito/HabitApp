import {
  router,
  useNavigation
} from 'expo-router'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native'
import {
  LinearGradient
} from 'expo-linear-gradient'
import {
  TimerPicker
} from 'react-native-timer-picker'
import {
  collection,
  addDoc,
  Timestamp,
  doc,
  setDoc
} from 'firebase/firestore'
import {
  db
} from '../../../src/config'
import Save from '../../components/Save'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const handlePress = (repeatTimer, repeatWeek, id): void => {
  const habitsDocRef = doc(db, 'habits', id)
  setDoc(habitsDocRef, {
    repeatTimer,
    repeatWeek,
    updatedAt:Timestamp.fromDate(new Date())
  })
    .then(() => {
      router.back()
    })
    .catch(() => {
      Alert.alert('更新に失敗しました！')
    })


  // addDoc(collection(habitsDocRef, 'repeats'), {
  //   repeatTimer,
  //   repeatWeek,
  //   updatedAt: Timestamp.fromDate(new Date())
  // })
  //   .then(() => {
  //     router.back()
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
}

const onPress = (repeatWeek: boolean[], i: number, setRepeatWeek: React.Dispatch<React.SetStateAction<any[]>>): void => {
  const updatedRepeatWeek: boolean[] = [...repeatWeek]
  updatedRepeatWeek[i] = (!repeatWeek[i])
  setRepeatWeek(updatedRepeatWeek)
}

const Alarm = (): JSX.Element => {
  const navigation = useNavigation()
  const { width: windowWidth } = useWindowDimensions()
  const scrollViewRef = useRef(null)
  const [repeatTimer, setRepeatTimer] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [repeatWeek, setRepeatWeek] = useState(new Array(7).fill(false))

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Save handlePress={() => { handlePress(repeatTimer, repeatWeek) }}/> }
    })
  }, [repeatTimer, repeatWeek])

  const onMomentumScrollEnd = useCallback(
    (event) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [windowWidth]
  )

  const renderExample = useMemo(() => {
    return (
      <View style={[styles.container, styles.pageContainer, { width: windowWidth }]}>
        <TimerPicker
          onDurationChange={
            (timer) => {
              setRepeatTimer({ hours: timer.hours, minutes: timer.minutes, seconds: 0 })
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
  }, [windowWidth, repeatTimer])

  return (
    <View style={styles.wholeScreen}>

      <View style={styles.repeatTimeDecisionSection}>
       <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          onMomentumScrollEnd={onMomentumScrollEnd}>
          {renderExample}
        </ScrollView>
      </View>

      <View style={styles.repeatSection}>
        <Text style={{ fontSize: 24, lineHeight: 24 }}>くり返し</Text>

        <View style = {styles.weekRepeat}>
          <TouchableOpacity onPress={() => { onPress(repeatWeek, 0, setRepeatWeek) }}>
            <View style={ repeatWeek[0] ? styles.dayTrueRepeat : styles.dayFalseRepeat }>
              <Text style={ styles.dayCharacter }>日</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { onPress(repeatWeek, 1, setRepeatWeek) }}>
            <View style={ repeatWeek[1] ? styles.dayTrueRepeat : styles.dayFalseRepeat }>
              <Text style={styles.dayCharacter}>月</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { onPress(repeatWeek, 2, setRepeatWeek) }}>
            <View style={ repeatWeek[2] ? styles.dayTrueRepeat : styles.dayFalseRepeat }>
              <Text style={styles.dayCharacter}>火</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { onPress(repeatWeek, 3, setRepeatWeek) }}>
            <View style={ repeatWeek[3] ? styles.dayTrueRepeat : styles.dayFalseRepeat }>
              <Text style={styles.dayCharacter}>水</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { onPress(repeatWeek, 4, setRepeatWeek) }}>
            <View style={ repeatWeek[4] ? styles.dayTrueRepeat : styles.dayFalseRepeat }>
              <Text style={styles.dayCharacter}>木</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { onPress(repeatWeek, 5, setRepeatWeek) }}>
            <View style={ repeatWeek[5] ? styles.dayTrueRepeat : styles.dayFalseRepeat }>
              <Text style={styles.dayCharacter}>金</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { onPress(repeatWeek, 6, setRepeatWeek) }}>
            <View style={ repeatWeek[6] ? styles.dayTrueRepeat : styles.dayFalseRepeat }>
              <Text style={styles.dayCharacter}>土</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wholeScreen: {
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
  repeatSection: {
    paddingLeft: 27,
    paddingRight: 27
  },
  weekRepeat: {
    flexDirection: 'row'
  },
  dayTrueRepeat: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    height: 32,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayFalseRepeat: {
    backgroundColor: '#C0C0C0',
    borderWidth: 1,
    height: 32,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayCharacter: {
    fontSize: 23,
    lineHeight: 23
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  pageContainer: {
    backgroundColor: '#E0F6FF'
  },
  repeatTimeDecisionSection: {
    backgroundColor: '#E0F6FF'
  }
})

export default Alarm
