// Types
import {
	TTransactionApprovalCancelForm,
	TTransactionApprovalHandleForm
} from './transaction-approval.type'

export interface ITransactionApprovalAttrsHandle {
	params: { transactionId: string }
	body: TTransactionApprovalHandleForm
}

export interface ITransactionApprovalAttrsCancel {
	params: { transactionId: string }
	body: TTransactionApprovalCancelForm
}
