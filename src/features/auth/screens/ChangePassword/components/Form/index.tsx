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
import { AppInput, AppButton } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

// React Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// Types
import { IAuthChangePasswordForm } from '@/features/auth/types'
import { TChangePasswordScreenProps } from '@/features/auth/screens/ChangePassword/types'

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
				console.log('FORM', form)
				console.log('route.params.token', route.params.token)

				navigation.replace(E_AUTH_STACK_NAVIGATION.LOGIN)
			} finally {
				//
			}
		},
		[route.params.token, navigation]
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
			>
				{t('app.action.submit')}
			</AppButton>
		</>
	)
})

ChangePasswordForm.displayName = 'ChangePasswordForm'

export { ChangePasswordForm }
