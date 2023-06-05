// React
import { memo, useCallback } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { AUTH_FORGOT_PASSWORD_FORM } from '@/features/auth/constants/auth-form.constant'

// Components
import { AppInput, AppButton } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// Form Validation
const formSchema = yup.object({
	email: yup.string().email().required()
})

const ForgotPasswordForm = memo(() => {
	// Translation
	const { t } = useTranslation()

	// Form
	const {
		control,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({
		defaultValues: AUTH_FORGOT_PASSWORD_FORM,
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

	/**
	 * @description Submit forgot password
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSubmit = useCallback(async (): Promise<void> => {
		try {
			//
		} finally {
			//
		}
	}, [])

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

			{/* Send Button */}
			<AppButton
				backgroundColor={'secondary.400'}
				marginTop={3}
				isDisabled={!isValid}
				rounded={'50'}
				onPress={handleSubmit(onSubmit)}
			>
				{t('app.action.send')}
			</AppButton>
		</>
	)
})

ForgotPasswordForm.displayName = 'ForgotPasswordForm'

export { ForgotPasswordForm }
