// Constants
import { E_APP_BOTTOM_TAB_NAVIGATION } from '@/features/app/constants'

// React Navigation
import { NavigatorScreenParams } from '@react-navigation/native'

// Types
import { TTransactionStackNavigationParams } from '@/features/transaction/navigations'

export type TAppBottomTabNavigationParams = {
	[E_APP_BOTTOM_TAB_NAVIGATION.HOME]: undefined
	[E_APP_BOTTOM_TAB_NAVIGATION.TRANSACTION]: NavigatorScreenParams<TTransactionStackNavigationParams>
	[E_APP_BOTTOM_TAB_NAVIGATION.ACCOUNT]: undefined
}
