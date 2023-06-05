// React
import { memo } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { AUTH_LOGIN_FORM } from '@/features/auth/constants/auth-form.constant'
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// Components
import { AppInput, AppText, AppButton } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { TLoginProps } from '@/features/auth/screens/Login/types'

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

	// Navigation
	const navigation = useNavigation<TLoginProps['navigation']>()

	return (
		<>
			{/* Email */}
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
				onPress={() =>
					navigation.navigate(E_AUTH_STACK_NAVIGATION.FORGOT_PASSWORD)
				}
			>
				{t('auth.title.forgotPassword')}
			</AppText>

			{/* Login Button */}
			<AppButton
				backgroundColor={'secondary.400'}
				marginTop={3}
				isDisabled={!isValid}
				rounded={'50'}
			>
				{t('auth.menu.login')}
			</AppButton>
		</>
	)
})

LoginForm.displayName = 'LoginForm'

export { LoginForm }
