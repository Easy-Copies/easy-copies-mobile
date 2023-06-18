// Constants
import { E_APP_STACK_NAVIGATION } from '@/features/app/constants'

// React Navigation
import { NavigatorScreenParams } from '@react-navigation/native'

// Types
import { TStoreStackNavigationParams } from '@/features/store/navigations'
import { TTransactionStackNavigationParams } from '@/features/transaction/navigations'
import { TAppBottomTabNavigationParams } from '@/features/app/navigations/BottomTab/types'

export type TAppRootStackNavigationParams = {
	[E_APP_STACK_NAVIGATION.AUTH]: undefined
	[E_APP_STACK_NAVIGATION.SPLASH]: undefined
	[E_APP_STACK_NAVIGATION.SPLASH_INTRO]: undefined
	[E_APP_STACK_NAVIGATION.ENTRY_POINT]: undefined
	[E_APP_STACK_NAVIGATION.APP]: NavigatorScreenParams<TAppBottomTabNavigationParams>
	[E_APP_STACK_NAVIGATION.STORE]: NavigatorScreenParams<TStoreStackNavigationParams>
	[E_APP_STACK_NAVIGATION.TRANSACTION]: NavigatorScreenParams<TTransactionStackNavigationParams>
}
