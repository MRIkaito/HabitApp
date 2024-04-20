import { View, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect } from 'react'
import HabitItem from '../../components/habitItem'
import Add from '../../components/add'
import Delete from '../../components/delete'

const handlePress = (): void => {
  router.push('./addHabit')
}

const Home = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Add handlePress={handlePress}/> },
      headerLeft: () => { return <Delete /> }
    })
  }, [])

  return (
    <View style={styles.container}>
      <HabitItem>腹筋！</HabitItem>
      <HabitItem>スクワット！</HabitItem>
      <HabitItem>腕立て伏せ！</HabitItem>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  }
})

export default Home
