// Interfaces
import {
	ITransactionAttrsIndex,
	ITransactionAttrsStore,
	ITransactionAttrsShow
} from '@/features/transaction/types/attrs.type'
import {
	ITransactionResponseList,
	ITransactionResponseDetail
} from '@/features/transaction/types/response.type'

// Rtk
import { emptySplitApi } from '@/features/app/redux'

// Moment
import moment from 'moment'

export const transactionApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		transaction_index: builder.query<
			ITransactionResponseList,
			ITransactionAttrsIndex | void
		>({
			query: payload => ({
				url: 'v1/transactions',
				params: payload?.params
			})
		}),
		transaction_show: builder.query<
			ITransactionResponseDetail,
			ITransactionAttrsShow
		>({
			query: payload => `v1/transactions/${payload.params.id}`
		}),
		transaction_store: builder.mutation<
			ITransactionResponseDetail,
			ITransactionAttrsStore
		>({
			query: payload => ({
				url: `v1/transactions/${payload.params.storeId}`,
				method: 'POST',
				body: {
					...payload.body,
					pickupDate: moment(payload.body.pickupDate).toISOString()
				}
			})
		})
	}),
	overrideExisting: false
})

export const {
	useLazyTransaction_indexQuery,
	useLazyTransaction_showQuery,
	useTransaction_storeMutation
} = transactionApi
