/**
 * @source https://www.youtube.com/watch?v=2TgArwz6je8
 */

// React
import { memo, useRef, useCallback } from 'react'

// React Native
import {
	Animated,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent
} from 'react-native'

// Components
import { AppView, AppWrapper } from '@/features/app/components'
import {
	SplashIntroPagination,
	StyledBottomWrapper,
	SlideItem
} from './components'

// Types
import { TSlideContent } from '@/features/app/screens/SplashIntro/types'

const contents: TSlideContent[] = [{ id: 1 }, { id: 2 }, { id: 3 }]

const HomeIntro = memo(() => {
	// Common State
	const flatListRef = useRef<any>(null)
	const scrollX = useRef(new Animated.Value(0)).current

	/**
	 * @description Handle when user scrolling flat list
	 *
	 * @param {any} any
	 *
	 * @return {void} void
	 */
	const handleOnScroll = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>): void => {
			Animated.event(
				[
					{
						nativeEvent: {
							contentOffset: {
								x: scrollX
							}
						}
					}
				],
				{
					useNativeDriver: false
				}
			)(event)
		},
		[scrollX]
	)

	/**
	 * @description Handle visibility of flat list
	 *
	 * @param {any} options
	 *
	 * @return {any} any
	 */
	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50
	}).current

	return (
		<AppWrapper>
			<AppView marginBottom={'20px'}>
				<FlatList
					data={contents}
					renderItem={({ item }) => <SlideItem item={item} />}
					horizontal
					pagingEnabled
					snapToAlignment='center'
					showsHorizontalScrollIndicator={false}
					onScroll={handleOnScroll}
					viewabilityConfig={viewabilityConfig}
					snapToEnd
					ref={flatListRef}
				/>
			</AppView>
			<StyledBottomWrapper>
				<SplashIntroPagination data={contents} scrollX={scrollX} />
			</StyledBottomWrapper>
		</AppWrapper>
	)
})

HomeIntro.displayName = 'HomeIntro'

export { HomeIntro }
