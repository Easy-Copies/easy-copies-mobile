// React
import { memo } from 'react'

// Components
import { AppWrapper, AppText, AppContainer } from '@/features/app/components'
import { AuthLayout } from '@/features/auth/components'
import { ForgotPasswordForm } from './components'

// i18n
import { useTranslation } from 'react-i18next'

const ForgotPasswordScreen = memo(() => {
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
						{t(`auth.menu.forgotPassword`)}
					</AppText>

					{/* Info */}
					<AppText
						textAlign={'center'}
						marginTop={5}
						marginBottom={5}
						fontSize={14}
						fontWeight={600}
						lineHeight={17.5}
					>
						{t(`auth.title.enterEmailForOtp`)}
					</AppText>

					{/* Form */}
					<ForgotPasswordForm />
				</AuthLayout>
			</AppContainer>
		</AppWrapper>
	)
})

ForgotPasswordScreen.displayName = 'ForgotPasswordScreen'

export { ForgotPasswordScreen }
