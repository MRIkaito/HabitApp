import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Header from '../../components/header'

const Alarm = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.alarmSection}>
        <Text>08:00</Text>
      </View>

      <View style={styles.repeatSection}>
        <Text>繰り返し</Text>
        <View style = {styles.weekRepeat}>
          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>日</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>月</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>火</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>水</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>木</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>金</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.dayRepeat}>
              <Text style={styles.dayCharacter}>土</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  },
  alarmSection: {
    height: 152,
    width: 384,
    marginTop: 104,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  repeatSection: {
    paddingLeft: 27,
    paddingRight: 27
  },
  weekRepeat: {
    flexDirection: 'row'
  },
  dayRepeat: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    height: 32,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayCharacter: {
    fontSize: 23,
    lineHeight: 23
  }
})

export default Alarm
