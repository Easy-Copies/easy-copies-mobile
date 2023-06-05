export interface IAuthSliceState {
	isAuthenticated: boolean
	tokens: {
		token: string
		refreshToken: string
	}
}
