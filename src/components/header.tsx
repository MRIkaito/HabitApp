import { View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from './icon'

interface Props {
  status: boolean
}

const Header = (props: Props): JSX.Element => {
  const status = props.status

  return (
    <View style={styles.header}>
      {status
        ? <>
          <TouchableOpacity style={styles.delete}>
            <Icon name="Delete" color="#D9D9D9" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.add}>
            <Icon name="Add" color="#000000"/>
          </TouchableOpacity>
        </>
        : <></>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E0F6FF',
    height: 96,
    width: 390,
    flexDirection: 'row'
  },
  delete: {
    height: 48,
    width: 48,
    position: 'absolute',
    top: 48,
    left: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add: {
    height: 48,
    width: 48,
    position: 'absolute',
    top: 48,
    right: 22,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Header
