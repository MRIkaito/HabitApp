import { View, StyleSheet } from 'react-native'
import { router, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import HabitMissionTextInput from '../../components/HabitMissionTextInput'
import HabitMissionDetail from '../../components/HabitMissionDetail'
import NotifyItem from '../../components/NotifyItem'
import Save from '../../components/Save'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../../src/config'

const handlePress = (): void => {
  addDoc(collection(db, 'habits'), {
    hatitMission: 'test'
  })
    .then((docRef) => {
      console.log('success', docRef.id)
      router.back()
    })
    .catch((error) => {
      console.log(error)
    })
}

const AddHabit = (): JSX.Element => {
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => { return <Save handlePress={handlePress}/> }
    })
  }, [])

  return (
  // 画面全体
  <View style = {styles.container}>
    <HabitMissionTextInput />
    <HabitMissionDetail />
    <NotifyItem />
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F6FF'
  }
})

export default AddHabit
