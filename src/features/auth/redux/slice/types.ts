// Types
import { IAuth } from '@/features/auth/types'

export interface IAuthSliceState {
	isAuthenticated: boolean
	tokens: {
		token: string
		refreshToken: string
	}
	authenticatedUser: IAuth | null
}
