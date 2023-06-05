// Types
import {
	IAuthForgotPasswordForm,
	IAuthLoginForm,
	IAuthRefreshTokenForm,
	IAuthRegisterForm,
	IAuthVerifyForm
} from './auth.type'

export interface IAuthAttrsLogin {
	body: IAuthLoginForm
}

export interface IAuthAttrsRegister {
	body: IAuthRegisterForm
}

export interface IAuthAttrsForgotPassword {
	body: IAuthForgotPasswordForm
}

export interface IAuthAttrsRefreshToken {
	body: IAuthRefreshTokenForm
}

export interface IAuthAttrsVerify {
	params: { token: string }
	body: IAuthVerifyForm
}
