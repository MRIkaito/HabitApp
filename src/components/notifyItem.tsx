import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const NotifyItem = (): JSX.Element => {
  return (
    <View style={styles.notifySection}>
      {/* 通知ヘッダ・通知追加 */}
      <View style={styles.notifyDescriptionHeader}>
        <Text style={styles.notifyDescription}>通知</Text>
        <TouchableOpacity>
          <Text>＋</Text>
        </TouchableOpacity>
      </View>

      {/* 通知アイテム */}
      <TouchableOpacity style={styles.notifyItem}>
        <View>
          <Text style={styles.notifyTime}>10:15</Text>
          <Text style={styles.notifyAlarm}>くり返し：(月)(金)</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.notifyDelete}></Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  notifySection: {
    paddingLeft: 24,
    paddingRight: 24
  },
  notifyDescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  notifyDescription: {
    lineHeight: 40,
    fontSize: 24,
    marginRight: 16
  },
  notifyItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    height: 80,
    width: 336,
    paddingLeft: 8,
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  notifyTime: {
    lineHeight: 56,
    fontSize: 44
  },
  notifyAlarm: {
    lineHeight: 24,
    fontSize: 20
  },
  notifyDelete: {
    borderWidth: 1, /* 位置をわかりやすくしているだけ．アイコン導入後に消去予定 */
    height: 32,
    width: 32,
    marginRight: 16
  }
})

export default NotifyItem
