// Interfaces
import { IAppResponsePagination, IAppResponse } from '@/features/app/types'
import { ITransaction, TTransactionPayment } from './transaction.type'

export type ITransactionResponseList = IAppResponsePagination<ITransaction[]>
export type ITransactionResponseDetail = IAppResponse<ITransaction>
export type ITransactionPaymentResponseDetail =
	IAppResponse<TTransactionPayment>
