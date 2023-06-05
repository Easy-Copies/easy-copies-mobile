// React
import { memo, useCallback } from 'react'

// React Hook Form
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Components
import { AppInput, AppButton, useAppToast } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// React Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// Types
import { TOtpVerifyScreenProps } from '@/features/auth/screens/OtpVerify/types'

// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// Redux
import { useAuth_verifyMutation } from '@/features/auth/redux'
import { E_AUTH_SIGN_TYPE } from '@/features/auth/constants'

// Form Validation
const formSchema = yup.object({
	token: yup.string().required()
})

const OtpVerifyForm = memo(() => {
	// Translation
	const { t } = useTranslation()

	// Form
	const {
		control,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({
		defaultValues: { token: '' },
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

	// RTK
	const [verify, { isLoading: isVerifyLoading }] = useAuth_verifyMutation()

	// Navigation
	const navigation = useNavigation<TOtpVerifyScreenProps['navigation']>()

	// Route
	const route = useRoute<TOtpVerifyScreenProps['route']>()

	// Toast
	const toast = useAppToast()

	/**
	 * @description Handle submit
	 *
	 * @param {object} form
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSubmit: SubmitHandler<{ token: string }> = useCallback(
		async ({ token }: { token: string }): Promise<void> => {
			try {
				const signType = route.params.signType
				const userId = route.params.userId

				// Check if user is verifying user after register
				// Check if user is login but user not active yet
				if (route.params.signType === E_AUTH_SIGN_TYPE.VERIFY_USER) {
					// Verify user
					const verifyResponse = await verify({
						params: { token },
						body: { signType, userId }
					}).unwrap()

					// Redirect back to login
					navigation.navigate(E_AUTH_STACK_NAVIGATION.LOGIN)

					// Show Toast
					toast.show({ description: verifyResponse.message })

					return
				}

				// Check if user want to change password
				if (route.params.signType === E_AUTH_SIGN_TYPE.FORGOT_PASSWORD) {
					navigation.navigate(E_AUTH_STACK_NAVIGATION.CHANGE_PASSWORD, {
						token,
						userId
					})
				}
			} finally {
				//
			}
		},
		[navigation, verify, route.params.signType, route.params.userId, toast]
	)

	return (
		<>
			{/* Token */}
			<Controller
				control={control}
				name='token'
				render={({ field: { onChange, ...fieldRest } }) => {
					return (
						<AppInput
							{...fieldRest}
							error={errors.token}
							onChangeText={onChange}
							inputLabel={'auth.form.otp'}
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
				isLoading={isVerifyLoading}
			>
				{t('app.action.send')}
			</AppButton>
		</>
	)
})

OtpVerifyForm.displayName = 'OtpVerifyForm'

export { OtpVerifyForm }
