// Types
import {
	ETransactionApprovalStatus,
	ITransaction
} from '@/features/transaction/types'

export interface ITransactionApproval extends ITransaction {
	transactionApprovals: {
		id: string
		userId: string
		transactionId: string
		status: ETransactionApprovalStatus
		statusDescription: string
		cancelReason: string | null
		rejectReason: string | null
		createdAt: string
	}[]
}

export type TTransactionApprovalHandleForm = {
	approvalStatus: ETransactionApprovalStatus
	rejectReason?: string
}

export type TTransactionApprovalCancelForm = {
	cancelReason: string
}
