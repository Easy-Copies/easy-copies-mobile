// Types
import { TStoreServiceForm } from './store-service.type'
import { IAppPaginationQuery } from '@/features/app/types'

export interface IStoreServiceAttrsIndex {
	params: { storeId: string; pagination?: IAppPaginationQuery }
}

export interface IStoreServiceAttrsStore {
	params: { storeId: string }
	body: TStoreServiceForm
}

export interface IStoreServiceAttrsShow {
	params: { id: string }
}

export interface IStoreServiceAttrsUpdate {
	params: { id: string }
	body: TStoreServiceForm
}

export interface IStoreServiceAttrsDestroy {
	params: { id: string }
}
