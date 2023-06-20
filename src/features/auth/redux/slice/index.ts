// Interfaces
import { IAuthSliceState } from './types'

// Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Types
import { IRootState } from '@/plugins/redux/reducer'
import { IAuth, IAuthRole } from '@/features/auth/types'
import { EAppPermission } from '@/features/app/types'

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
export const authGetIsCanDoTransactionApproval = (state: IRootState) => {
	if (state.auth.authenticatedUser) {
		const findActiveRole = state.auth.authenticatedUser.roles.find(
			role => role.isActive
		) as IAuthRole | undefined
		if (findActiveRole?.permissions?.length === 0) return false

		const rolePermission = findActiveRole?.permissions?.find(
			permission =>
				permission.code === EAppPermission.TRANSACTION_MANAGEMENT_APPROVAL
		)

		if (!rolePermission) return false

		return rolePermission.actions.create && rolePermission.actions.update
	} else {
		return false
	}
}

export default authSlice.reducer
