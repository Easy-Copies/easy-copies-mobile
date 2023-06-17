// Constants
import { E_STORE_STACK_NAVIGATION } from '@/features/app/constants'

export type TStoreStackNavigationParams = {
	[E_STORE_STACK_NAVIGATION.STORE_LIST]: { from?: string }
	[E_STORE_STACK_NAVIGATION.STORE_DETAIL]: {
		id: string
		name: string
	}
}
