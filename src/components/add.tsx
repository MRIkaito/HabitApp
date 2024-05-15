import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from './Icon'

interface Props {
  onSave: () => void
}

const Add = (props: Props): JSX.Element => {
  const handleSave = props.onSave
  return (
    <TouchableOpacity style={styles.add} onPress={handleSave}>
      <Icon iconName="Add" iconColor="#000000"/>
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
