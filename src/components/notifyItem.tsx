// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { Link, router } from 'expo-router'

// import Icon from './Icon'

// const handlePress = (): void => {
//   router.push('./alarm')
// }

// const NotifyItem = (): JSX.Element => {
//   return (
//     <View style={styles.notifySection}>
//       {/* 通知ヘッダ・通知追加 */}
//       <View style={styles.notifyDescriptionHeader}>
//         <Text style={styles.notifyDescription}>通知</Text>
//         <TouchableOpacity style={styles.circleButton} onPress={handlePress}>
//           <Text style={styles.circleButtonLabel}>＋</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 通知アイテム */}
//       <Link href='/habit/alarm' asChild>
//         <TouchableOpacity style={styles.notifyItem}>
//           <View>
//             <Text style={styles.notifyTime}>10:15</Text>
//             <Text style={styles.notifyAlarm}>くり返し：(月)(金)</Text>
//           </View>
//           <TouchableOpacity style={{ marginRight: 16 }}>
//             <Icon name='DeleteNotify' color='#D9D9D9' />
//           </TouchableOpacity>
//         </TouchableOpacity>
//       </Link>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   notifySection: {
//     paddingLeft: 24,
//     paddingRight: 24
//   },
//   notifyDescriptionHeader: {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   notifyDescription: {
//     lineHeight: 40,
//     fontSize: 24,
//     marginRight: 16
//   },
//   notifyItem: {
//     flexDirection: 'row',
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderRadius: 10,
//     height: 80,
//     width: 336,
//     paddingLeft: 8,
//     marginBottom: 16,
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   notifyTime: {
//     lineHeight: 56,
//     fontSize: 44
//   },
//   notifyAlarm: {
//     lineHeight: 24,
//     fontSize: 20
//   },
//   circleButton: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#ffffff',
//     borderColor: '#0085ff',
//     borderWidth: 2,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   circleButtonLabel: {
//     color: '#0085ff',
//     fontSize: 24,
//     fontWeight: '700'
//   }
// })
// export default NotifyItem

// インポート
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
  Pressable,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
  useWindowDimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { TimerPicker } from 'react-native-timer-picker'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

// 関数
export default function App() {
  const { width: screenWidth } = useWindowDimensions()
  const scrollViewRef = useRef(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  useEffect(() => {
    // when changing to landscape mode, scroll to the nearest page index
    scrollViewRef.current?.scrollTo({
      x: screenWidth * currentPageIndex,
      animated: false
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth])

  const onMomentumScrollEnd = useCallback(
    (event) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      const { contentOffset } = event.nativeEvent
      const newPageIndex = Math.round(contentOffset.x / screenWidth)
      setCurrentPageIndex(newPageIndex)
    }, [screenWidth]
  )

  const renderExample3 = useMemo(() => {
    return (
      <View
        style={[
          styles.container,
          styles.page3Container,
          { width: screenWidth }
        ]}>
        <TimerPicker
          padWithNItems={2}
          hourLabel=":"
          minuteLabel=":"
          secondLabel=""
          LinearGradient={LinearGradient}
          styles={{
            theme: 'dark',
            backgroundColor: '#202020',
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
  }, [screenWidth])

  const renderNavigationArrows = useMemo(() => {
    return (
      <>
        {currentPageIndex !== 3
          ? (
              <Pressable
                onPress={() => {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  )
                  setCurrentPageIndex((currentPageIndex) => {
                    scrollViewRef.current?.scrollTo({
                      x: screenWidth * (currentPageIndex + 1),
                      animated: true
                    })

                    return currentPageIndex + 1
                  })
                }}
                style={({ pressed }) => [
                  styles.chevronPressable,
                  { right: 8 },
                  pressed && styles.chevronPressable._pressed
                ]}>
                <Ionicons
                  color={currentPageIndex % 2 !== 0 ? '#514242' : '#F1F1F1'}
                  name="chevron-forward"
                  size={32}
                />
              </Pressable>
            )
          : null }
        {currentPageIndex !== 0
          ? (
            <Pressable
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                )
                setCurrentPageIndex((currentPageIndex) => {
                  scrollViewRef.current?.scrollTo({
                    x: screenWidth * (currentPageIndex - 1),
                    animated: true
                  })
                  return currentPageIndex - 1
                })
              }}
              style={({ pressed }) => [
                styles.chevronPressable,
                { left: 8 },
                pressed && styles.chevronPressable._pressed,
              ]}>
            <Ionicons
              color={currentPageIndex % 2 !== 0 ? '#514242' : '#F1F1F1'}
              name="chevron-back"
              size={32}
            />
            </Pressable>
            )
          : null}
      </>
    )
  }, [currentPageIndex, screenWidth])

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}>

        {renderExample3}

      </ScrollView>
      {renderNavigationArrows}
    </>
  )
}

// スタイリング
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  page1Container: {
    backgroundColor: '#514242'
  },
  page2Container: {
    backgroundColor: '#F1F1F1'
  },
  page3Container: {
    backgroundColor: '#202020'
  },
  page4Container: {
    backgroundColor: '#F1F1F1'
  },
  textDark: {
    fontSize: 18,
    color: '#F1F1F1'
  },
  textLight: {
    fontSize: 18,
    color: '#202020'
  },
  alarmTextDark: {
    fontSize: 48,
    color: '#F1F1F1'
  },
  alarmTextLight: {
    fontSize: 48,
    color: '#202020'
  },
  touchableContainer: {
    alignItems: 'center'
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 16,
    overflow: 'hidden'
  },
  buttonDark: {
    borderColor: '#C2C2C2',
    color: '#C2C2C2'
  },
  buttonLight: {
    borderColor: '#8C8C8C',
    color: '#8C8C8C'
  },
  buttonContainer: { marginTop: 30 },
  chevronPressable: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    padding: 8,
    _pressed: { opacity: 0.7 }
  }
})

