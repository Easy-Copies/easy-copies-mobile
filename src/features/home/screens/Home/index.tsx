// React
import { memo } from 'react'

// React Native
import { ScrollView } from 'native-base'

// Components
import { AppWrapper, AppContainer } from '@/features/app/components'
import { HomeServices, HomeUserInfo, HomeNearbyStore } from './components'

const HomeScreen = memo(() => {
	return (
		<ScrollView flex={1} backgroundColor={'white'} nestedScrollEnabled>
			{/* User Info */}
			<HomeUserInfo />

			<AppWrapper>
				<AppContainer>
					{/* Nearby Store */}
					<HomeNearbyStore />

					{/* Home Services */}
					<HomeServices />
				</AppContainer>
			</AppWrapper>
		</ScrollView>
	)
})

HomeScreen.displayName = 'HomeScreen'

export { HomeScreen }
