// Interfaces
import {
	IStoreAttrsIndex,
	IStoreAttrsStore,
	IStoreAttrsShow,
	IStoreAttrsUpdate,
	IStoreAttrsDestroy
} from '@/features/store/types/attrs.type'
import {
	IStoreResponseList,
	IStoreResponseDetail
} from '@/features/store/types/response.type'

// Rtk
import { emptySplitApi } from '@/features/app/redux'

export const storeApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		store_index: builder.query<IStoreResponseList, IStoreAttrsIndex | void>({
			query: payload => ({
				url: 'v1/stores',
				params: payload?.params
			})
		}),
		store_show: builder.query<IStoreResponseDetail, IStoreAttrsShow>({
			query: payload => `v1/stores/${payload.params.id}`
		}),
		store_store: builder.mutation<IStoreResponseDetail, IStoreAttrsStore>({
			query: payload => ({
				url: `v1/stores`,
				method: 'POST',
				body: payload.body
			})
		}),
		store_update: builder.mutation<IStoreResponseDetail, IStoreAttrsUpdate>({
			query: payload => ({
				url: `v1/stores/${payload.params.id}`,
				method: 'PATCH',
				body: payload.body
			})
		}),
		store_destroy: builder.mutation<IStoreResponseDetail, IStoreAttrsDestroy>({
			query: payload => ({
				url: `v1/stores/${payload.params.id}`,
				method: 'DELETE'
			})
		})
	}),
	overrideExisting: false
})

export const {
	useLazyStore_indexQuery,
	useLazyStore_showQuery,
	useStore_storeMutation,
	useStore_updateMutation,
	useStore_destroyMutation
} = storeApi
