import { createIconSetFromIcoMoon } from '@expo/vector-icons'
import { useFonts } from 'expo-font'

import fontData from '../../assets/fonts/habitIcon.ttf'
import fontSelection from '../../assets/fonts/selection.json'

interface Props {
  name: string
  color: string
}

const CustomIcon = createIconSetFromIcoMoon(
  fontSelection,
  'IcoMoon',
  'habitIcon.ttf'
)

const Icon = (props: Props): JSX.Element | null => {
  const { name, color } = props

  const [fontLoaded] = useFonts({
    IcoMoon: fontData
  })

  if (!fontLoaded) {
    return null
  }
  return (
    <CustomIcon name={name} size={48} color={color} />
  )
}

export default Icon
