export interface IAuth {
	id: number
	title: string
	completed: boolean
}

export interface IAuthLoginForm {
	email: string
	password: string
}

export interface IAuthRegisterForm {
	name: string
	email: string
	password: string
}

export interface IAuthForgotPasswordForm {
	email: string
}

export interface IAuthChangePasswordForm {
	password: string
}
