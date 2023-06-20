// React
import { memo } from 'react'

// Components
import { AppText, AppView } from '@/features/app/components'
import { StyledPhotoProfile, StyledWrapper } from './components'

// Redux
import { useAppSelector } from '@/plugins'
import { authGetAuthenticatedUserName } from '@/features/auth/redux'

// React Native
import { SafeAreaView } from 'react-native'

// i18n
import { useTranslation } from 'react-i18next'

const HomeUserInfo = memo(() => {
	// Selector
	const authAuthenticatedUserName = useAppSelector(authGetAuthenticatedUserName)

	// Translation
	const { t } = useTranslation()

	return (
		<AppView style={{ backgroundColor: '#fff' }}>
			<StyledWrapper>
				<SafeAreaView>
					<AppView
						paddingTop={'30px'}
						paddingLeft={20}
						paddingRight={20}
						flexDirection={'row'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						{/* Photo Profile */}
						<StyledPhotoProfile />

						{/* Greeting */}
						<AppView marginLeft={20}>
							<AppText
								color={'white'}
								fontWeight={700}
								fontSize={24}
								lineHeight={30}
							>
								{t('app.welcomeGreet')}, {'\n'}
								{authAuthenticatedUserName}
							</AppText>
						</AppView>
					</AppView>
				</SafeAreaView>
			</StyledWrapper>
		</AppView>
	)
})

HomeUserInfo.displayName = 'HomeUserInfo'

export { HomeUserInfo }
