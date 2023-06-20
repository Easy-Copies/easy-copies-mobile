// Constants
import { E_AUTH_SIGN_TYPE } from '@/features/auth/constants'

export interface IAuthPermission {
	code: string
	actions: {
		create: boolean
		read: boolean
		update: boolean
		delete: boolean
	}
}

export interface IAuthRole {
	isActive: boolean
	createdAt: string
	updatedAt: string
	roleName: string
	id: string
	permissions: IAuthPermission[]
}

export interface IAuth {
	id: string
	name: string
	email: string
	isUserVerified: boolean
	createdAt: string
	updatedAt: string
	roles: IAuthRole[]
}

export interface IAuthToken {
	token: string
	refreshToken: string
}

export interface IAuthUser {
	id: string
	name: string
	email: string
	isUserVerified: boolean
	createdAt: string
	updatedAt: string
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

export interface IAuthRefreshTokenForm {
	refreshToken: string
}

export interface IAuthVerifyForm {
	signType: E_AUTH_SIGN_TYPE
	userId: string
	password?: string
}

export interface IAuthForgotPasswordForm {
	email: string
}

export interface IAuthChangePasswordForm {
	password: string
}
