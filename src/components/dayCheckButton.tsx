import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const DayCheckButton = (): JSX.Element => {
  return (
    <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
      <Text></Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dayCheckButton: {
    backgroundColor: '#C0C0C0',
    height: 32,
    width: 48,
    borderWidth: 1
  }
})

export default DayCheckButton
