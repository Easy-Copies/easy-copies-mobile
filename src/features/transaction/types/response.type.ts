// Interfaces
import { IAppResponsePagination, IAppResponse } from '@/features/app/types'
import { IStore } from './transaction.type'

export type IStoreResponseList = IAppResponsePagination<IStore[]>
export type IStoreResponseDetail = IAppResponse<IStore>
