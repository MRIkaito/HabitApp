import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from './Icon'

const Delete = (): JSX.Element => {
  return (
    <TouchableOpacity style={styles.delete}>
      <Icon iconName="Delete" iconColor="#D9D9D9" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  delete: {
    height: 48,
    width: 48
  }
})

export default Delete
