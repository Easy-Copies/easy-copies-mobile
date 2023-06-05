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
import { TRegisterScreenProps } from './types'

// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// i18n
import { useTranslation } from 'react-i18next'

const RegisterScreen = memo(({ navigation }: TRegisterScreenProps) => {
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
							width={155}
							onPress={() => navigation.navigate(E_AUTH_STACK_NAVIGATION.LOGIN)}
							rounded={'50'}
							_text={{
								color: 'secondary.400'
							}}
							variant={'outline'}
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
