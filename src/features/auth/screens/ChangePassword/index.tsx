// React
import { memo } from 'react'

// Components
import { AppWrapper, AppText, AppContainer } from '@/features/app/components'
import { AuthLayout } from '@/features/auth/components'
import { ChangePasswordForm } from './components'

// i18n
import { useTranslation } from 'react-i18next'

const ChangePasswordScreen = memo(() => {
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
						{t('auth.menu.changePassword')}
					</AppText>

					{/* Form */}
					<ChangePasswordForm />
				</AuthLayout>
			</AppContainer>
		</AppWrapper>
	)
})

ChangePasswordScreen.displayName = 'ChangePasswordScreen'

export { ChangePasswordScreen }
