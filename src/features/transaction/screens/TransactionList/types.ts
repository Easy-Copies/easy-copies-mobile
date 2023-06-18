// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'

// Constants
import { E_TRANSACTION_STACK_NAVIGATION } from '@/features/app/constants'

// Navigation
import {
	TAppDrawerNavigationParams,
	TAppRootStackNavigationParams
} from '@/features/app/navigations'
import { TTransactionStackNavigationParams } from '@/features/transaction/navigations'

export type TTransactionListScreenProps = CompositeScreenProps<
	NativeStackScreenProps<
		TTransactionStackNavigationParams,
		E_TRANSACTION_STACK_NAVIGATION.TRANSACTION_LIST
	>,
	CompositeScreenProps<
		NativeStackScreenProps<TAppRootStackNavigationParams>,
		DrawerScreenProps<TAppDrawerNavigationParams>
	>
>
