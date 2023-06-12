// React
import { memo } from 'react'

// React Native
import { Dimensions, Animated, Easing } from 'react-native'

// Components
import { SplashOne, SplashTwo, SplashThree, StyledCentered } from './components'

// Types
import { TSlideContent } from '@/features/app/screens/SplashIntro/types'

// React Native Dimension
const { width } = Dimensions.get('screen')

const SplashIntroSlideItem = memo(({ item }: { item: TSlideContent }) => {
	const translateYImage = new Animated.Value(40)

	Animated.timing(translateYImage, {
		toValue: 0,
		duration: 1000,
		useNativeDriver: true,
		easing: Easing.bounce
	}).start()

	return (
		<StyledCentered style={{ width: width }}>
			{item.id === 1 && <SplashOne />}
			{item.id === 2 && <SplashTwo />}
			{item.id === 3 && <SplashThree />}
		</StyledCentered>
	)
})

SplashIntroSlideItem.displayName = 'SplashIntroSlideItem'

export { SplashIntroSlideItem }
