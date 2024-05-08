import { router, useNavigation } from 'expo-router'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef
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
  TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { TimerPicker } from 'react-native-timer-picker'
import Save from '../../components/Save'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

const handlePress = (): void => {
  router.back()
}

const Alarm = (): JSX.Element => {
  const navigation = useNavigation()
  const { width: windowWidth } = useWindowDimensions()
  const scrollViewRef = useRef(null)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Save handlePress={handlePress}/> }
    })
  }, [])

  const onMomentumScrollEnd = useCallback(
    (event) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [windowWidth]
  )

  const renderExample = useMemo(() => {
    return (
      <View style={[styles.container, styles.pageContainer, { width: windowWidth }]}>
        <TimerPicker
          padWithNItems={2}
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
  }, [windowWidth])

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
          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>日</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>月</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>火</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>水</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>木</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>金</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
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
  dayRepeat: {
    backgroundColor: '#ffffff',
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
