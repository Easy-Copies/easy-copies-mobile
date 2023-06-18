// Types
import { TTransactionForm } from './transaction.type'
import { IAppPaginationQuery } from '@/features/app/types'

export interface ITransactionAttrsIndex {
	params?: IAppPaginationQuery
}

export interface ITransactionAttrsStore {
	params: { storeId: string }
	body: TTransactionForm
}

export interface ITransactionAttrsShow {
	params: { id: string }
}
