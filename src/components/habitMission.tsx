import { Text, View, StyleSheet } from 'react-native'

interface Props {
  children: string
}

const HabitMission = (props: Props): JSX.Element => {
  const children = props.children

  return (
    <View style={styles.habitMissionLayout}>
      <Text style={styles.habitMission}>{children}</Text>
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
