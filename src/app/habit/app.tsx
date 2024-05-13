import { useEffect } from 'react'
import { View, Button } from 'react-native'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})
const weekdayScheduleNotificationAsync = async (select: boolean, select2: boolean): Promise<void> => {
  if (select) {
    const trigger = new Date(Date.now() + 5000)

    await Notifications.scheduleNotificationAsync({
      content: {
        body: 'test5000'
      },
      trigger
    })
  }

  if (select2) {
    const trigger2 = new Date(Date.now() + 2500)
    // trigger.setMinutes(0)
    // trigger.setSeconds(0)

    await Notifications.scheduleNotificationAsync({
      content: {
        body: 'test2500'
      },
      trigger: trigger2
    })
  }
}

const requestPermissionsAsync = async (): Promise<void> => {
  const { granted } = await Notifications.getPermissionsAsync()
  if (granted) { return }

  await Notifications.requestPermissionsAsync()
}

const App = (): JSX.Element => {
  useEffect(() => {
    requestPermissionsAsync()
      .then(() => {})
      .catch(() => {})
  })

  return (
    <View>
      <Button
        title='61秒後にプッシュ通知する'
        onPress={ () => { weekdayScheduleNotificationAsync(true, true) } }
      />
    </View>
  )
}

export default App
