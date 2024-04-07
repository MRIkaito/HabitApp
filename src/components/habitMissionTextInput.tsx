import { View, Text, StyleSheet, TextInput } from 'react-native'

const HabitMissionTextInput = (): JSX.Element => {
  return (
  <View style={styles.habitMissionSection}>
    <Text style={styles.habitMissionDescription}>習慣化したいことはなんですか？</Text>
    <TextInput
      placeholder=" 例)毎日15分ランニング！"
      editable = { true }
      maxLength={15}
      style = {styles.habitMissionTextInput}
    />
  </View>
  )
}

const styles = StyleSheet.create({
  habitMissionSection: {
    flexDirection: 'column',
    width: 390,
    height: 80,
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 16
  },
  habitMissionDescription: {
    fontSize: 23,
    lineHeight: 23
  },
  habitMissionTextInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    height: 48,
    width: 336,
    lineHeight: 24,
    fontSize: 24
  }
})

export default HabitMissionTextInput
