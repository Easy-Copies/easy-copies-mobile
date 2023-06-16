// Types
import { TStoreForm } from './store.type'
import { IAppPaginationQuery } from '@/features/app/types'

export interface IStoreAttrsIndex {
	params?: IAppPaginationQuery
}

export interface IStoreAttrsStore {
	body: TStoreForm
}

export interface IStoreAttrsShow {
	params: { id: number }
}

export interface IStoreAttrsUpdate {
	params: { id: number }
	body: TStoreForm
}

export interface IStoreAttrsDestroy {
	params: { id: number }
}
