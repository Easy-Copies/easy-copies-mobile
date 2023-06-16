// Constants
import { E_APP_STACK_NAVIGATION } from '@/features/app/constants'

// React Navigation
import { NavigatorScreenParams } from '@react-navigation/native'

// Types
import { TStoreStackNavigationParams } from '@/features/store/navigations/Stack/types'

export type TAppRootStackNavigationParams = {
	[E_APP_STACK_NAVIGATION.AUTH]: undefined
	[E_APP_STACK_NAVIGATION.SPLASH]: undefined
	[E_APP_STACK_NAVIGATION.SPLASH_INTRO]: undefined
	[E_APP_STACK_NAVIGATION.ENTRY_POINT]: undefined
	[E_APP_STACK_NAVIGATION.APP]: undefined
	[E_APP_STACK_NAVIGATION.STORE]: NavigatorScreenParams<TStoreStackNavigationParams>
}
