// Redux Toolkit
import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { Middleware } from '@reduxjs/toolkit'

// Types
import { IAppResponseError } from '@/features/app/types'

// i18n
import i18n from '@/plugins/i18n'

// Native Base
import { Toast } from 'native-base'

// Components
import { AppToast } from '@/features/app/components'

const middlewareRenderGenericError = (errorType: string): string => {
	switch (errorType) {
		case 'FETCH_ERROR':
			return i18n.t('app.error.internalServerError')
		case 'TIMEOUT_ERROR':
			return i18n.t('app.error.timeout')
		default:
			return ''
	}
}

const middlewareRenderErrorByStatusCode = (status: number): string => {
	switch (status) {
		case 400:
			return i18n.t('app.error.badRequest')
		case 422:
			return i18n.t('app.error.unprocessableEntity')
		case 500:
			return i18n.t('app.error.internalServerError')
		default:
			return i18n.t('app.error.error')
	}
}

/**
 * @description Handle error in server
 *
 * @return {Middleware} Redux Toolkit Middleware
 */
export const middlewareError: Middleware = () => next => action => {
	// RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
	if (isRejectedWithValue(action)) {
		const _action = action as {
			payload: {
				status: string | number
				data: IAppResponseError
				error?: string
			}
		}

		const {
			payload: { data, error, status }
		} = _action

		const GENERIC_ERROR = middlewareRenderGenericError(
			_action.payload.status as string
		)

		if (data.errors.length > 0) {
			data.errors.forEach(error => {
				Toast.show({
					render: () => (
						<AppToast
							description={error.message}
							status='error'
							title={middlewareRenderErrorByStatusCode(status as number)}
							variant='top-accent'
						/>
					),
					placement: 'top-right'
				})
			})
		} else {
			Toast.show({
				render: () => (
					<AppToast
						description={`Error: ${GENERIC_ERROR || error}`}
						status='error'
						title={middlewareRenderErrorByStatusCode(status as number)}
						variant='top-accent'
					/>
				),
				placement: 'top-right'
			})
		}
	}

	// Check for outside error, like request timeout
	if (action?.error?.name === 'AbortError') {
		Toast.show({
			render: () => (
				<AppToast
					description={i18n.t('app.error.timeout')}
					status='error'
					title={'Timeout'}
					variant='top-accent'
				/>
			),
			placement: 'top-right'
		})
	}

	return next(action)
}
