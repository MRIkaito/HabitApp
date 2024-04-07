import { View, Text, StyleSheet } from 'react-native'

const HabitDayLog = (): JSX.Element => {
  return (
    <View style = {styles.habitDayLog}>
      <View style = {styles.day}>
        <Text>1</Text>
      </View>
      <View style = {styles.daylog}>
        <Text>◯</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  habitDayLog: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    height: 56,
    width: 48
  },
  day: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  daylog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default HabitDayLog
