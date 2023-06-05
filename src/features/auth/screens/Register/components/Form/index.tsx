// React
import { memo, useCallback } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { AUTH_REGISTER_FORM } from '@/features/auth/constants/auth-form.constant'
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'
import { E_AUTH_SIGN_TYPE } from '@/features/auth/constants'

// Components
import { AppInput, AppButton } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { TRegisterScreenProps } from '@/features/auth/screens/Register/types'
import { IAuthRegisterForm } from '@/features/auth/types'

// Redux
import { useAuth_registerMutation } from '@/features/auth/redux'

// Form Validation
const formSchema = yup.object({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required().min(8)
})

const RegisterForm = memo(() => {
	// Translation
	const { t } = useTranslation()

	// Form
	const {
		control,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({
		defaultValues: AUTH_REGISTER_FORM,
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

	// RTK
	const [register, { isLoading: isRegisterLoading }] =
		useAuth_registerMutation()

	// Navigation
	const navigation = useNavigation<TRegisterScreenProps['navigation']>()

	/**
	 * @description Handle submit
	 *
	 * @param {IAuthRegisterForm} form
	 *
	 * @return {void}
	 */
	const onSubmit = useCallback(
		async (form: IAuthRegisterForm): Promise<void> => {
			try {
				// Register new user
				const registerResponse = await register({ body: form }).unwrap()

				// Redirect to OTP verification
				navigation.navigate(E_AUTH_STACK_NAVIGATION.OTP_VERIFY, {
					signType: E_AUTH_SIGN_TYPE.VERIFY_USER,
					userId: registerResponse.result.id
				})
			} catch (_) {
				//
			}
		},
		[register, navigation]
	)

	return (
		<>
			{/* Name */}
			<Controller
				control={control}
				name='name'
				render={({ field: { onChange, ...fieldRest } }) => {
					return (
						<AppInput
							{...fieldRest}
							error={errors.name}
							onChangeText={onChange}
							inputLabel={'auth.form.name'}
						/>
					)
				}}
			/>

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

			{/* Register Button */}
			<AppButton
				backgroundColor={'secondary.400'}
				marginTop={3}
				isDisabled={!isValid}
				isLoading={isRegisterLoading}
				rounded={'50'}
				onPress={handleSubmit(onSubmit)}
			>
				{t('auth.menu.register')}
			</AppButton>
		</>
	)
})

RegisterForm.displayName = 'RegisterForm'

export { RegisterForm }
