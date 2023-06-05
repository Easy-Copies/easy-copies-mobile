// React Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeScreenProps } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'

// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// Navigation
import {
	TAppDrawerNavigationParams,
	TAppRootStackNavigationParams
} from '@/features/app/navigations'
import { TAuthStackNavigationParams } from '@/features/auth/navigations'

export type TForgotPasswordProps = CompositeScreenProps<
	NativeStackScreenProps<
		TAuthStackNavigationParams,
		E_AUTH_STACK_NAVIGATION.FORGOT_PASSWORD
	>,
	CompositeScreenProps<
		NativeStackScreenProps<TAppRootStackNavigationParams>,
		DrawerScreenProps<TAppDrawerNavigationParams>
	>
>
