import { Text, StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  handlePress: () => void
}

const Save = (props: Props): JSX.Element => {
  const { handlePress } = props
  return (
    <TouchableOpacity style={styles.saveSection} onPress={handlePress}>
      <Text style={styles.save}>保存</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  saveSection: {
    height: 48,
    width: 72,
    justifyContent: 'center',
    alignItems: 'center'
  },
  save: {
    fontSize: 18,
    lineHeight: 24
  }
})

export default Save
