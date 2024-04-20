import { useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

const App = (): JSX.Element => {
  useEffect(() => {
    requestPermissionsAsync()
      .then(() => {})
      .catch(() => {})
  })

  return (
    <View style={styles.container}>
      <Button
        title='3秒後にプッシュ通知する'
        onPress={ scheduleNotificationAsync }
      />
    </View>
  )
}

const scheduleNotificationAsync = async (): Promise<void> => {
  await Notifications.scheduleNotificationAsync({
    content: {
      body: 'test'
    },
    trigger: {
      seconds: 3
    }
  })
}

const requestPermissionsAsync = async (): Promise<void> => {
  const { granted } = await Notifications.getPermissionsAsync()
  if (granted) { return }

  await Notifications.requestPermissionsAsync()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
})

export default App
