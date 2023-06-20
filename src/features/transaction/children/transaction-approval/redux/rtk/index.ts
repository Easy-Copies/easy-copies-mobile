// Interfaces
import {
	ITransactionApprovalAttrsCancel,
	ITransactionApprovalAttrsHandle
} from '@/features/transaction/children/transaction-approval/types/attrs.type'
import { ITransactionApprovalResponseDetail } from '@/features/transaction/children/transaction-approval/types/response.type'

// Rtk
import { emptySplitApi } from '@/features/app/redux'

export const transactionApprovalApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		transactionApproval_handle: builder.mutation<
			ITransactionApprovalResponseDetail,
			ITransactionApprovalAttrsHandle
		>({
			query: payload => ({
				url: `v1/transactions/approvals/handle/${payload.params.transactionId}`,
				body: payload.body,
				method: 'PUT'
			})
		}),
		transactionApproval_cancel: builder.mutation<
			ITransactionApprovalResponseDetail,
			ITransactionApprovalAttrsCancel
		>({
			query: payload => ({
				url: `v1/transactions/approvals/cancel/${payload.params.transactionId}`,
				method: 'PUT'
			})
		})
	}),
	overrideExisting: false
})

export const {
	useTransactionApproval_handleMutation,
	useTransactionApproval_cancelMutation
} = transactionApprovalApi
