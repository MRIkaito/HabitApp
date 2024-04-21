import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from './Icon'

interface Props {
  handlePress: () => void
}

const Add = (props: Props): JSX.Element => {
  const { handlePress } = props
  return (
    <TouchableOpacity style={styles.add} onPress={handlePress}>
      <Icon name="Add" color="#000000"/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  add: {
    height: 48,
    width: 48
  }
})

export default Add
