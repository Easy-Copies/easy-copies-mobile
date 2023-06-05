// React
import { memo } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { AUTH_LOGIN_FORM } from '@/features/auth/constants/auth-form.constant'

// Components
import { AppInput, AppText, AppButton } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// Form Validation
const formSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required()
})

const LoginForm = memo(() => {
	// Translation
	const { t } = useTranslation()

	// Form
	const {
		control,
		formState: { errors, isValid }
	} = useForm({
		defaultValues: AUTH_LOGIN_FORM,
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

	return (
		<>
			<Controller
				control={control}
				name='email'
				render={({ field: { onChange, ...fieldRest } }) => {
					return (
						<AppInput
							{...fieldRest}
							error={errors.email}
							onChangeText={email =>
								onChange(email.replace(/\s+/, '').toLowerCase())
							}
							inputLabel={'auth.form.email'}
						/>
					)
				}}
			/>

			{/* Password */}
			<Controller
				control={control}
				name='password'
				render={({ field: { onChange, ...fieldRest } }) => {
					return (
						<AppInput
							{...fieldRest}
							type='password'
							error={errors.password}
							onChangeText={onChange}
							inputLabel={'auth.form.password'}
						/>
					)
				}}
			/>

			{/* Forgot Password */}
			<AppText
				textAlign={'right'}
				marginTop={1}
				fontSize={14}
				fontWeight={600}
				lineHeight={17.5}
			>
				{t('auth.title.forgotPassword')}
			</AppText>

			{/* Login Button */}
			<AppButton
				backgroundColor={'secondary.400'}
				marginTop={3}
				isDisabled={!isValid}
			>
				{t('auth.menu.login')}
			</AppButton>
		</>
	)
})

LoginForm.displayName = 'LoginForm'

export { LoginForm }
