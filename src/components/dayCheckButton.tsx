import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { doc, setDoc } from 'firebase/firestore'
import Icon from './Icon'
import { db, auth } from '../config'

interface Props {
  habitItemId?: string
  achievementsIndex?: number
  achievementLog?: boolean
  achievements?: Array<{
    year: number
    month: number
    day: number
    dayOfWeek: number
    achievement: boolean
  }>
}

const handlePressTransition = (
  habitItemId: string,
  achievementsIndex: number,
  achievementLog: boolean,
  achievements: Array<{
    year: number
    month: number
    day: number
    dayOfWeek: number
    achievement: boolean
  }>
): void => {
  if (auth.currentUser === null) { return }
  const refToUserHabitsItemId = doc(db, `users/${auth.currentUser.uid}/habits`, habitItemId)
  const remoteAchievements = [...achievements]

  achievementLog = (!achievementLog)
  remoteAchievements[achievementsIndex].achievement = achievementLog
  setDoc(
    refToUserHabitsItemId,
    {
      achievements: remoteAchievements
    },
    { merge: true }
  )
    .catch((error: string) => { console.log(error) })
}

const DayCheckButton = (props: Props): JSX.Element => {
  const { habitItemId, achievementsIndex, achievementLog, achievements } = props
  if (
    (habitItemId === undefined) ||
    (achievementsIndex === undefined) ||
    (achievementLog === undefined) ||
    (achievements === undefined)) {
    return (
      <TouchableOpacity style={styles.undoStatus} >
        <Text></Text>
      </TouchableOpacity>
    )
  }

  if (achievementLog) {
    return (
      // スタイリングはまだ直していない．
      <TouchableOpacity style={styles.undoStatus} onPress={() => { handlePressTransition(habitItemId, achievementsIndex, achievementLog, achievements) }}>
        <Text>
          ◯
          {/* <Icon iconName='' iconColor='#24FF00' /> */}
        </Text>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity style={styles.undoStatus} onPress={() => { handlePressTransition(habitItemId, achievementsIndex, achievementLog, achievements) }}>
        <Text>✗</Text>
        {/* <Icon iconName='' iconColor='#24FF00' /> */}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  undoStatus: {
    backgroundColor: '#C0C0C0',
    height: 32,
    width: 48,
    borderWidth: 1
  }
})

export default DayCheckButton
