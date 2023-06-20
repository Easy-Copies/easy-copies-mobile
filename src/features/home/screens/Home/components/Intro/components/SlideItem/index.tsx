// React
import { memo } from 'react'

// Components
import { AppView } from '@/features/app/components'
import { Items } from './components'

// Types
import { TSlideContent } from '@/features/app/screens/SplashIntro/types'

// React Native
import { Dimensions } from 'react-native'

const SlideItem = memo(({ item }: { item: TSlideContent }) => {
	return (
		<AppView style={{ width: Dimensions.get('screen').width - 40 }}>
			{item.id === 1 && <Items />}
			{item.id === 2 && <Items />}
			{item.id === 3 && <Items />}
		</AppView>
	)
})

SlideItem.displayName = 'SlideItem'

export { SlideItem }
