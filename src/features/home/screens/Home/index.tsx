// React
import { memo } from 'react'

// React Native
import { ScrollView } from 'native-base'

// Components
import { AppWrapper, AppContainer } from '@/features/app/components'
import { HomeServices, HomeUserInfo } from './components'

const HomeScreen = memo(() => {
	return (
		<ScrollView flex={1} backgroundColor={'white'} nestedScrollEnabled>
			{/* User Info */}
			<HomeUserInfo />

			<AppWrapper>
				<AppContainer>
					<HomeServices />
				</AppContainer>
			</AppWrapper>
		</ScrollView>
	)
})

HomeScreen.displayName = 'HomeScreen'

export { HomeScreen }
