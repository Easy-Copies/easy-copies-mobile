/**
 * @source https://www.youtube.com/watch?v=2TgArwz6je8
 */

// React
import { memo, useRef, useCallback, useState } from 'react'

// React Native
import {
	Animated,
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent
} from 'react-native'

// Components
import { AppButton, AppWrapper } from '@/features/app/components'
import {
	SplashIntroSlideItem,
	SplashIntroPagination,
	StyledBottomWrapper
} from './components'

// Types
import { TSlideContent } from '@/features/app/screens/SplashIntro/types'

// i18n
import { useTranslation } from 'react-i18next'

// Redux
import { useAppDispatch } from '@/plugins'
import { app_HANDLE_SPLASH_INTRO_DONE } from '@/features/app/redux'

const contents: TSlideContent[] = [{ id: 1 }, { id: 2 }, { id: 3 }]

const AppSplashIntroScreen = memo(() => {
	// Common State
	const [index, setIndex] = useState(0)
	const flatListRef = useRef<any>(null)
	const scrollX = useRef(new Animated.Value(0)).current

	// Translation
	const { t } = useTranslation()

	// Dispatcher
	const dispatch = useAppDispatch()

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
	 * @description Handle button action
	 *
	 * @return {void} void
	 */
	const handleButtonAction = useCallback((): void => {
		if (flatListRef?.current) {
			// Check if current index is in 1
			// Then redirect
			if (index === 2) {
				dispatch(app_HANDLE_SPLASH_INTRO_DONE(true))
			} else {
				flatListRef?.current?.scrollToIndex({
					animated: true,
					index: index + 1
				})
				setIndex(prevIndex => prevIndex + 1)
			}
		}
	}, [index, dispatch])

	/**
	 * @description Handle flat list change
	 *
	 * @param {any} options
	 *
	 * @return {any} any
	 */
	const handleOnViewableItemsChanged = useRef(({ viewableItems }: any) => {
		setIndex(viewableItems[0].index)
	}).current

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
			<FlatList
				data={contents}
				renderItem={({ item }) => <SplashIntroSlideItem item={item} />}
				horizontal
				pagingEnabled
				snapToAlignment='center'
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={handleOnViewableItemsChanged}
				onScroll={handleOnScroll}
				viewabilityConfig={viewabilityConfig}
				snapToEnd
				ref={flatListRef}
			/>
			<StyledBottomWrapper>
				<SplashIntroPagination data={contents} scrollX={scrollX} />
				<AppButton rounded={'50'} width={150} onPress={handleButtonAction}>
					{t(`app.${index === 2 ? 'start' : 'next'}`)}
				</AppButton>
			</StyledBottomWrapper>
		</AppWrapper>
	)
})

AppSplashIntroScreen.displayName = 'AppSplashIntroScreen'

export { AppSplashIntroScreen }
