// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'

// Constants
import { E_STORE_STACK_NAVIGATION } from '@/features/app/constants'

// Navigation
import {
	TAppDrawerNavigationParams,
	TAppRootStackNavigationParams
} from '@/features/app/navigations'
import { TStoreStackNavigationParams } from '@/features/store/navigations'

export type TStoreProps = CompositeScreenProps<
	NativeStackScreenProps<
		TStoreStackNavigationParams,
		E_STORE_STACK_NAVIGATION.STORE_LIST
	>,
	CompositeScreenProps<
		NativeStackScreenProps<TAppRootStackNavigationParams>,
		DrawerScreenProps<TAppDrawerNavigationParams>
	>
>
