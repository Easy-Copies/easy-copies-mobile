// React
import { memo, useCallback } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'
import {
	AUTH_FORGOT_PASSWORD_FORM,
	E_AUTH_SIGN_TYPE
} from '@/features/auth/constants'

// Components
import { AppInput, AppButton, useAppToast } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// Redux
import { useAuth_forgotPasswordMutation } from '@/features/auth/redux'

// Types
import { TForgotPasswordScreenProps } from '@/features/auth/screens/ForgotPassword/types'
import { IAuthForgotPasswordForm } from '@/features/auth/types'

// React Navigation
import { useNavigation } from '@react-navigation/native'

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

	// RTK
	const [forgotPassword, { isLoading: isForgotPasswordLoading }] =
		useAuth_forgotPasswordMutation()

	// Toast
	const toast = useAppToast()

	// Navigation
	const navigation = useNavigation<TForgotPasswordScreenProps['navigation']>()

	/**
	 * @description Submit forgot password
	 *
	 * @param {IAuthForgotPasswordForm} form
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSubmit = useCallback(
		async (form: IAuthForgotPasswordForm): Promise<void> => {
			try {
				const forgotPasswordResponse = await forgotPassword({
					body: form
				}).unwrap()

				// Navigate to OTP verify
				navigation.navigate(E_AUTH_STACK_NAVIGATION.OTP_VERIFY, {
					signType: E_AUTH_SIGN_TYPE.FORGOT_PASSWORD,
					userId: forgotPasswordResponse.result.id
				})

				// Show toast
				toast.show({ description: forgotPasswordResponse.message })
			} catch (_) {
				//
			}
		},
		[forgotPassword, navigation, toast]
	)

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
				isLoading={isForgotPasswordLoading}
			>
				{t('app.action.send')}
			</AppButton>
		</>
	)
})

ForgotPasswordForm.displayName = 'ForgotPasswordForm'

export { ForgotPasswordForm }
