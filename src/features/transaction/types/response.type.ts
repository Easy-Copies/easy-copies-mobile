// Interfaces
import { IAppResponsePagination, IAppResponse } from '@/features/app/types'
import { ITransaction } from './transaction.type'

export type ITransactionResponseList = IAppResponsePagination<ITransaction[]>
export type ITransactionResponseDetail = IAppResponse<ITransaction>
