import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const HabitDayLog = (): JSX.Element => {
  return (
    <View style = {styles.habitDayLog}>
      <View style = {styles.day}>
        <Text>1</Text>
      </View>
      <TouchableOpacity style = {styles.daylog}>
        <Text>◯</Text>
      </TouchableOpacity>
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
