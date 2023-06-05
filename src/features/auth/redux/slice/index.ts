// Interfaces
import { IAuthSliceState } from './types'

// Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Types
import { IRootState } from '@/plugins/redux/reducer'
import { IAuth } from '@/features/auth/types'

const initialState: IAuthSliceState = {
	isAuthenticated: false,
	tokens: {
		token: '',
		refreshToken: ''
	},
	authenticatedUser: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		auth_HANDLE_AUTHENTICATED: (state, { payload }: PayloadAction<boolean>) => {
			state.isAuthenticated = payload
		},
		auth_HANDLE_TOKENS: (
			state,
			{ payload }: PayloadAction<IAuthSliceState['tokens']>
		) => {
			state.tokens = payload
		},
		auth_HANDLE_AUTHENTICATED_USER: (
			state,
			{ payload }: PayloadAction<IAuth>
		) => {
			state.authenticatedUser = payload
		},
		auth_HANDLE_LOGOUT: state => {
			state.isAuthenticated = initialState.isAuthenticated
			state.tokens = initialState.tokens
			state.authenticatedUser = initialState.authenticatedUser
		}
	}
})

// Actions / Mutations
export const {
	auth_HANDLE_AUTHENTICATED,
	auth_HANDLE_TOKENS,
	auth_HANDLE_AUTHENTICATED_USER,
	auth_HANDLE_LOGOUT
} = authSlice.actions

// Getters
export const authGetIsAuthenticated = (state: IRootState) =>
	state.auth.isAuthenticated
export const authGetToken = (state: IRootState) => state.auth.tokens.token
export const authGetRefreshToken = (state: IRootState) =>
	state.auth.tokens.refreshToken
export const authGetAuthenticatedUserName = (state: IRootState) =>
	state.auth.authenticatedUser?.name || ''

export default authSlice.reducer
