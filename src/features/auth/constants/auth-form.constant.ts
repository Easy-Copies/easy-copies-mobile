// Types
import {
	IAuthChangePasswordForm,
	IAuthForgotPasswordForm,
	IAuthLoginForm,
	IAuthRegisterForm
} from '@/features/auth/types'

export const AUTH_LOGIN_FORM: IAuthLoginForm = {
	email: '',
	password: ''
}

export const AUTH_REGISTER_FORM: IAuthRegisterForm = {
	name: '',
	email: '',
	password: ''
}

export const AUTH_FORGOT_PASSWORD_FORM: IAuthForgotPasswordForm = {
	email: ''
}

export const AUTH_CHANGE_PASSWORD_FORM: IAuthChangePasswordForm = {
	password: ''
}
