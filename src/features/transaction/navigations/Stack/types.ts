// Constants
import { E_TRANSACTION_STACK_NAVIGATION } from '@/features/app/constants'

// Types
import { EStoreServiceName } from '@/features/store/children/store-service/types/store-service.type'

export type TTransactionStackNavigationParams = {
	[E_TRANSACTION_STACK_NAVIGATION.TRANSACTION_CREATE]: {
		storeId: string
		storeService: EStoreServiceName
		storePricePerSheet: number
	}
}
