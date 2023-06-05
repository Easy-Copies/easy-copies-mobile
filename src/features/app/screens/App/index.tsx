// React
import { memo } from 'react'

// Components
import { AppWrapper, AppButton, AppView } from '@/features/app/components'
import { StyledCentered } from './components'

// Redux
import { auth_HANDLE_LOGOUT } from '@/features/auth/redux'

// Hooks
import { useAppDispatch } from '@/plugins'

// i18n
import { useTranslation } from 'react-i18next'

const AppScreen = memo(() => {
	// Translator
	const { t } = useTranslation()

	// Dispatcher
	const dispatch = useAppDispatch()

	return (
		<AppWrapper>
			<StyledCentered>
				<AppView
					style={{
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
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
