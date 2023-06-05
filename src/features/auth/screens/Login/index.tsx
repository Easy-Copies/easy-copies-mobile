// React
import { memo } from 'react'

// Components
import {
	AppWrapper,
	AppText,
	AppContainer,
	AppView,
	AppButton
} from '@/features/app/components'
import { AuthLayout } from '@/features/auth/components'
import { LoginForm } from './components'

// Types
import { TLoginProps } from './types'

// Native Base
import { Row, Column } from 'native-base'

// Constants
import {
	E_APP_DRAWER_NAVIGATION,
	E_APP_STACK_NAVIGATION
} from '@/features/app/constants'

// i18n
import { useTranslation } from 'react-i18next'

const LoginScreen = memo(({ navigation }: TLoginProps) => {
	// Translation
	const { t } = useTranslation()

	return (
		<AppWrapper>
			<AppContainer>
				<AuthLayout>
					{/* Heading */}
					<AppText
						textAlign={'center'}
						fontSize={28}
						fontWeight={700}
						lineHeight={35}
						color={'primary.400'}
						marginBottom={10}
					>
						{t('auth.menu.login')}
					</AppText>

					{/* Form */}
					<LoginForm />

					{/* Register Now */}
					<AppText
						textAlign={'center'}
						marginTop={5}
						marginBottom={5}
						fontSize={14}
						fontWeight={600}
						lineHeight={17.5}
					>
						{t('auth.title.doesntHaveAccount')}
					</AppText>

					{/* Register Button */}
					<AppView justifyContent={'center'} alignItems={'center'}>
						<AppButton backgroundColor={'secondary.400'} width={155}>
							{t('auth.menu.register')}
						</AppButton>
					</AppView>
				</AuthLayout>
			</AppContainer>
		</AppWrapper>
	)
})

LoginScreen.displayName = 'LoginScreen'

export { LoginScreen }
