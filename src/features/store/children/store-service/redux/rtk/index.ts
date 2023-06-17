// Interfaces
import {
	IStoreServiceAttrsIndex,
	IStoreServiceAttrsStore,
	IStoreServiceAttrsShow,
	IStoreServiceAttrsUpdate,
	IStoreServiceAttrsDestroy
} from '@/features/store/children/store-service/types/attrs.type'
import {
	IStoreServiceResponseList,
	IStoreServiceResponseDetail
} from '@/features/store/children/store-service/types/response.type'

// Rtk
import { emptySplitApi } from '@/features/app/redux'

export const storeApi = emptySplitApi.injectEndpoints({
	endpoints: builder => ({
		storeService_index: builder.query<
			IStoreServiceResponseList,
			IStoreServiceAttrsIndex
		>({
			query: payload => ({
				url: `v1/stores/services/${payload.params.storeId}`,
				params: payload.params?.pagination
			})
		}),
		storeService_show: builder.query<
			IStoreServiceResponseDetail,
			IStoreServiceAttrsShow
		>({
			query: payload => `v1/stores/${payload.params.id}`
		}),
		storeService_store: builder.mutation<
			IStoreServiceResponseDetail,
			IStoreServiceAttrsStore
		>({
			query: payload => ({
				url: `v1/stores/services/${payload.params.storeId}`,
				method: 'POST',
				body: payload.body
			})
		}),
		storeService_update: builder.mutation<
			IStoreServiceResponseDetail,
			IStoreServiceAttrsUpdate
		>({
			query: payload => ({
				url: `v1/stores/services/${payload.params.id}`,
				method: 'PATCH',
				body: payload.body
			})
		}),
		storeService_destroy: builder.mutation<
			IStoreServiceResponseDetail,
			IStoreServiceAttrsDestroy
		>({
			query: payload => ({
				url: `v1/stores/services/${payload.params.id}`,
				method: 'DELETE'
			})
		})
	}),
	overrideExisting: false
})

export const {
	useLazyStoreService_indexQuery,
	useLazyStoreService_showQuery,
	useStoreService_storeMutation,
	useStoreService_updateMutation,
	useStoreService_destroyMutation
} = storeApi
