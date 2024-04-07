import { View, StyleSheet } from 'react-native'
import Header from '../../components/header'
import HabitItem from '../../components/habitItem'

const Home = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <HabitItem />
      <HabitItem />
      <HabitItem />
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
