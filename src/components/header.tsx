import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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
            <Text>□</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.add}>
            <Text>＋</Text>
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
