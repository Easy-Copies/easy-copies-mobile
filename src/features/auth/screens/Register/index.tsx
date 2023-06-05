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
import { RegisterForm } from './components'

// Types
import { TRegisterProps } from './types'

// Native Base
import { Row, Column } from 'native-base'

// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// i18n
import { useTranslation } from 'react-i18next'

const RegisterScreen = memo(({ navigation }: TRegisterProps) => {
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
						{t('auth.menu.register')}
					</AppText>

					{/* Form */}
					<RegisterForm />

					{/* Already Have An Account? */}
					<AppText
						textAlign={'center'}
						marginTop={5}
						marginBottom={5}
						fontSize={14}
						fontWeight={600}
						lineHeight={17.5}
					>
						{t('auth.title.alreadyHaveAccount')}
					</AppText>

					{/* Login Button */}
					<AppView justifyContent={'center'} alignItems={'center'}>
						<AppButton
							backgroundColor={'secondary.400'}
							width={155}
							onPress={() => navigation.navigate(E_AUTH_STACK_NAVIGATION.LOGIN)}
						>
							{t('auth.menu.login')}
						</AppButton>
					</AppView>
				</AuthLayout>
			</AppContainer>
		</AppWrapper>
	)
})

RegisterScreen.displayName = 'RegisterScreen'

export { RegisterScreen }
