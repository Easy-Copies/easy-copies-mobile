// Interfaces
import {
	ITransactionAttrsIndex,
	ITransactionAttrsStore,
	ITransactionAttrsShow,
	ITransactionAttrsPay
} from '@/features/transaction/types/attrs.type'
import {
	ITransactionResponseList,
	ITransactionResponseDetail,
	ITransactionPaymentResponseDetail
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
			}),
			transformResponse: (
				response: ITransactionResponseList
			): ITransactionResponseList => {
				return {
					...response,
					result: {
						...response.result,
						rows: response.result.rows.map(row => ({
							...row,
							pickupDate: moment(row.pickupDate)
								.format('DD MMMM YYYY - HH:mm')
								.toString(),
							createdAt: moment(row.createdAt)
								.format('DD MMMM YYYY - HH:mm')
								.toString()
						}))
					}
				}
			}
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
		}),
		transaction_pay: builder.mutation<
			ITransactionPaymentResponseDetail,
			ITransactionAttrsPay
		>({
			query: payload => ({
				url: `v1/transactions/payments/${payload.params.transactionId}`,
				method: 'POST',
				body: payload.body
			})
		})
	}),
	overrideExisting: false
})

export const {
	useLazyTransaction_indexQuery,
	useLazyTransaction_showQuery,
	useTransaction_storeMutation,
	useTransaction_payMutation
} = transactionApi
