import { Redirect, router } from 'expo-router'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config'
import anonymousLogin from '../components/AnonymousLogin'

const Index = (): JSX.Element => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        router.replace('habit/home')
      }
    })
  }, [])

  anonymousLogin()
    .then(() => {})
    .catch(() => {})
  return <Redirect href='habit/home' />
}

export default Index
