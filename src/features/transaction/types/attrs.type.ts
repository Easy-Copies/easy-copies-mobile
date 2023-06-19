// Types
import {
	ETransactionApprovalStatus,
	TTransactionForm,
	TTransactionPayForm
} from './transaction.type'
import { IAppPaginationQuery } from '@/features/app/types'

export interface ITransactionAttrsIndex {
	params?: {
		status: ETransactionApprovalStatus | undefined
	} & IAppPaginationQuery
}

export interface ITransactionAttrsStore {
	params: { storeId: string }
	body: TTransactionForm
}

export interface ITransactionAttrsPay {
	params: { transactionId: string }
	body: TTransactionPayForm
}

export interface ITransactionAttrsShow {
	params: { id: string }
}
