// Interfaces
import { IAppResponsePagination, IAppResponse } from '@/features/app/types'
import { IStoreService } from './store-service.type'

export type IStoreServiceResponseList = IAppResponsePagination<IStoreService[]>
export type IStoreServiceResponseDetail = IAppResponse<IStoreService>
