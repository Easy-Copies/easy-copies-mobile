// Redux Toolkit
import {
	fetchBaseQuery,
	createApi,
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'

// Types
import { TAuthResponseToken } from '@/features/auth/types'

// Env
import { API_BASE } from '@env'

// Plugins
import { IRootState } from '@/plugins/redux/reducer'

// Async Mutex
import { Mutex } from 'async-mutex'

// Reducer
import { auth_HANDLE_TOKENS, auth_HANDLE_LOGOUT } from '@/features/auth/redux'

// Init Mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
	baseUrl: API_BASE,
	timeout: 10000,
	prepareHeaders(headers, { getState }) {
		const rootState = getState() as IRootState
		const token = rootState.auth.tokens.token

		// Set request for coming from mobile to server
		headers.set('Accept', 'application/json')
		headers.set('Cache-Control', 'no-cache')
		headers.set('Pragma', 'no-cache')
		headers.set('Expires', '0')
		headers.set('x-is-mobile', '1')

		// Handle if you have any header send to the server
		if (token !== '') {
			headers.set('Authorization', `Bearer ${token}`)
		}

		return headers
	}
})

const baseQueryWithReAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	// wait until the mutex is available without locking it
	await mutex.waitForUnlock()
	let result = await baseQuery(args, api, extraOptions)

	if (
		result.error &&
		result.error.status === 401 &&
		result.meta?.request?.url &&
		!['/auth/verify'].includes(result.meta?.request?.url)
	) {
		// checking whether the mutex is locked
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()
			try {
				const refreshResult = (await baseQuery(
					{
						url: 'v1/auth/refresh-token',
						method: 'POST',
						body: {
							refreshToken: (api.getState() as IRootState).auth.tokens
								.refreshToken
						}
					},
					api,
					extraOptions
				)) as { data: TAuthResponseToken }

				if (refreshResult.data) {
					api.dispatch(auth_HANDLE_TOKENS(refreshResult.data?.result))

					// retry the initial query
					result = await baseQuery(args, api, extraOptions)

					if (result.error?.status === 401) {
						api.dispatch(auth_HANDLE_LOGOUT())
					}
				} else {
					api.dispatch(auth_HANDLE_LOGOUT())
				}
			} catch (_) {
				api.dispatch(auth_HANDLE_LOGOUT())
			} finally {
				// release must be called once the mutex should be released again.
				release()
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock()
			result = await baseQuery(args, api, extraOptions)
		}
	}

	return result
}

export const emptySplitApi = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: () => ({})
})
