// React
import { memo, useCallback } from 'react'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { AUTH_LOGIN_FORM } from '@/features/auth/constants/auth-form.constant'
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'
import { E_AUTH_SIGN_TYPE } from '@/features/auth/constants'

// Components
import { AppInput, AppButton, useAppToast } from '@/features/app/components'

// Native Base
import { Column } from 'native-base'

// i18n
import { useTranslation } from 'react-i18next'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Redux
import { useAppDispatch } from '@/plugins'
import {
	useAuth_loginMutation,
	useLazyAuth_meQuery,
	auth_HANDLE_TOKENS,
	auth_HANDLE_AUTHENTICATED,
	auth_HANDLE_AUTHENTICATED_USER
} from '@/features/auth/redux'

// Types
import { TLoginScreenProps } from '@/features/auth/screens/Login/types'
import { IAuthLoginForm } from '@/features/auth/types'

// Form Validation
const formSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required()
})

const LoginForm = memo(() => {
	// Dispatcher
	const dispatch = useAppDispatch()

	// Translation
	const { t } = useTranslation()

	// Form
	const {
		control,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({
		defaultValues: AUTH_LOGIN_FORM,
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

	// Navigation
	const navigation = useNavigation<TLoginScreenProps['navigation']>()

	// RTK
	const [login, { isLoading: isLoginLoading }] = useAuth_loginMutation()
	const [getAuthenticatedUser, { isLoading: isMeLoading }] =
		useLazyAuth_meQuery()

	// Toast
	const toast = useAppToast()

	/**
	 * @description Handle submit
	 *
	 * @param {IAuthLoginForm} form
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSubmit = useCallback(
		async (form: IAuthLoginForm): Promise<void> => {
			try {
				// Log user in
				const loginResponse = await login({ body: form }).unwrap()

				// Set token
				dispatch(auth_HANDLE_TOKENS(loginResponse.result))

				// Get authenticated user
				const authenticatedUserResponse = await getAuthenticatedUser().unwrap()
				const { id: userId, isUserVerified } = authenticatedUserResponse.result

				// Check if user not active yet
				if (!isUserVerified) {
					// Redirect to otp verification
					navigation.navigate(E_AUTH_STACK_NAVIGATION.OTP_VERIFY, {
						signType: E_AUTH_SIGN_TYPE.VERIFY_USER,
						userId
					})
				}

				// Check if user is active
				if (isUserVerified) {
					dispatch(auth_HANDLE_AUTHENTICATED(true))
					dispatch(
						auth_HANDLE_AUTHENTICATED_USER(authenticatedUserResponse.result)
					)
				}

				// Show Toast
				toast.show({ description: loginResponse.message })
			} catch (_) {
				//
			}
		},
		[login, getAuthenticatedUser, navigation, dispatch, toast]
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
			<Column
				textAlign={'right'}
				alignItems={'flex-end'}
				justifyContent={'flex-end'}
			>
				<AppButton
					onPress={() =>
						navigation.navigate(E_AUTH_STACK_NAVIGATION.FORGOT_PASSWORD)
					}
					variant={'ghost'}
					rounded={50}
					_text={{
						textAlign: 'right',
						color: 'primary.400'
					}}
				>
					{t('auth.title.forgotPassword')}
				</AppButton>
			</Column>

			{/* Login Button */}
			<AppButton
				backgroundColor={'secondary.400'}
				marginTop={3}
				isDisabled={!isValid}
				rounded={'50'}
				isLoading={isLoginLoading || isMeLoading}
				onPress={handleSubmit(onSubmit)}
			>
				{t('auth.menu.login')}
			</AppButton>
		</>
	)
})

LoginForm.displayName = 'LoginForm'

export { LoginForm }
