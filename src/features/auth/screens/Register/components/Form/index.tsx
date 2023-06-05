// React
import { memo } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { AUTH_REGISTER_FORM } from '@/features/auth/constants/auth-form.constant'

// Components
import { AppInput, AppButton } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

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
		formState: { errors, isValid }
	} = useForm({
		defaultValues: AUTH_REGISTER_FORM,
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

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
			>
				{t('auth.menu.register')}
			</AppButton>
		</>
	)
})

RegisterForm.displayName = 'RegisterForm'

export { RegisterForm }
