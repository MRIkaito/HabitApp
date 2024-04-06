import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Index = (): JSX.Element => {
  return (
    // 画面全体
    <View style={styles.container}>

      {/* ヘッダ */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.delete}>
          <Text>□</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.add}>
          <Text>＋</Text>
        </TouchableOpacity>
      </View>

      {/* 一つ一つのタスク */}
      <View style={styles.habitItem}>
        <View style={styles.habitMissionLayout}>
          <Text style={styles.habitMission}>毎日腹筋10回！</Text>
        </View>
        <View style={styles.weeklyCheckButtons}>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 一つ一つのタスク */}
      <View style={styles.habitItem}>
        <View style={styles.habitMissionLayout}>
          <Text style={styles.habitMission}>毎日腹筋10回！</Text>
        </View>
        <View style={styles.weeklyCheckButtons}>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 一つ一つのタスク */}
      <View style={styles.habitItem}>
        <View style={styles.habitMissionLayout}>
          <Text style={styles.habitMission}>毎日腹筋10回！</Text>
        </View>
        <View style={styles.weeklyCheckButtons}>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dayCheckButton} /* onPress={onPress} */>
            <Text></Text>
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
  },
  habitMissionLayout: {
    justifyContent: 'center',
    height: 48,
    width: 336
  },
  habitItem: {
    backgroundColor: '#CCF0FF',
    height: 80,
    width: 390,
    paddingLeft: 24,
    paddingRight: 30,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 5 }
  },
  weeklyCheckButtons: {
    flex: 1,
    flexDirection: 'row'
  },
  dayCheckButton: {
    backgroundColor: '#C0C0C0',
    height: 32,
    width: 48,
    borderWidth: 1
  },
  habitMission: {
    fontSize: 24,
    lineHeight: 24
  }
})

export default Index
