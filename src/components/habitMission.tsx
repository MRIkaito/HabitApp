import { Text, View, StyleSheet } from 'react-native'

const HabitMission = (): JSX.Element => {
  return (
    <View style={styles.habitMissionLayout}>
      <Text style={styles.habitMission}>毎日腹筋10回！</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default HabitMission
