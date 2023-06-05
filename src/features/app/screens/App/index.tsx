// React
import { memo } from 'react'

// Components
import {
	AppWrapper,
	AppButton,
	AppView,
	AppText
} from '@/features/app/components'
import { StyledCentered } from './components'

// Redux
import { useAppDispatch, useAppSelector } from '@/plugins'
import {
	auth_HANDLE_LOGOUT,
	authGetAuthenticatedUserName
} from '@/features/auth/redux'

// i18n
import { useTranslation } from 'react-i18next'

const AppScreen = memo(() => {
	// Translator
	const { t } = useTranslation()

	// Dispatcher
	const dispatch = useAppDispatch()

	// Selector
	const userName = useAppSelector(authGetAuthenticatedUserName)

	return (
		<AppWrapper>
			<StyledCentered>
				<AppView
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<AppText marginBottom={2}>Hi {userName}</AppText>

					<AppButton onPress={() => dispatch(auth_HANDLE_LOGOUT())}>
						{t('app.logout')}
					</AppButton>
				</AppView>
			</StyledCentered>
		</AppWrapper>
	)
})

AppScreen.displayName = 'AppScreen'

export { AppScreen }
