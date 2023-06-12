// Types
import { TSlideContent } from '@/features/app/screens/SplashIntro/types'

// React Native
import { Animated } from 'react-native'

export type TSplashIntroPaginationProps = {
	data: TSlideContent[]
	scrollX: Animated.Value
}
