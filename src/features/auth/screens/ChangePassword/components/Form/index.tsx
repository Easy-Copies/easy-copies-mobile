// React
import { memo, useCallback } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { AUTH_CHANGE_PASSWORD_FORM } from '@/features/auth/constants/auth-form.constant'
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// Components
import { AppInput, AppButton, useAppToast } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// React Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// Types
import { IAuthChangePasswordForm } from '@/features/auth/types'
import { TChangePasswordScreenProps } from '@/features/auth/screens/ChangePassword/types'

// Redux
import { useAuth_verifyMutation } from '@/features/auth/redux'
import { E_AUTH_SIGN_TYPE } from '@/features/auth/constants'

// Form Validation
const formSchema = yup.object({
	password: yup.string().required().min(8)
})

const ChangePasswordForm = memo(() => {
	// Translation
	const { t } = useTranslation()

	// Form
	const {
		control,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({
		defaultValues: AUTH_CHANGE_PASSWORD_FORM,
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

	// Navigation
	const navigation = useNavigation<TChangePasswordScreenProps['navigation']>()

	// Route
	const route = useRoute<TChangePasswordScreenProps['route']>()

	// RTK
	const [verify, { isLoading: isVerifyLoading }] = useAuth_verifyMutation()

	// Toast
	const toast = useAppToast()

	/**
	 * @description Handle submit
	 *
	 * @param {IAuthChangePasswordForm} form
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSubmit = useCallback(
		async (form: IAuthChangePasswordForm): Promise<void> => {
			try {
				const token = route.params.token
				const userId = route.params.userId

				// Verify to change password
				const verifyResponse = await verify({
					params: { token },
					body: {
						signType: E_AUTH_SIGN_TYPE.FORGOT_PASSWORD,
						userId,
						password: form.password
					}
				}).unwrap()

				// Navigate back to login
				navigation.replace(E_AUTH_STACK_NAVIGATION.LOGIN)

				// Show toast
				toast.show({ description: verifyResponse.message })
			} finally {
				//
			}
		},
		[route.params.token, route.params.userId, verify, navigation, toast]
	)

	return (
		<>
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

			{/* Submit Button */}
			<AppButton
				backgroundColor={'secondary.400'}
				marginTop={3}
				isDisabled={!isValid}
				rounded={'50'}
				onPress={handleSubmit(onSubmit)}
				isLoading={isVerifyLoading}
			>
				{t('app.action.submit')}
			</AppButton>
		</>
	)
})

ChangePasswordForm.displayName = 'ChangePasswordForm'

export { ChangePasswordForm }
