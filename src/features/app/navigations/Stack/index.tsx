// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Navigation
import { AuthStackNavigation } from '@/features/auth/navigations'
import { AppBottomTabNavigation } from '@/features/app/navigations/BottomTab'
import { StoreStackNavigation } from '@/features/store/navigations'

// App Screens
import { AppSplashScreen, AppSplashIntroScreen } from '@/features/app/screens'

// Interfaces
import { TAppRootStackNavigationParams } from './types'

// Constants
import { E_APP_STACK_NAVIGATION } from '@/features/app/constants'

// Plugins
import { useAppSelector } from '@/plugins'

// Redux
import {
	appGetInitialized,
	appGetIsSplashIntroDone
} from '@/features/app/redux'
import { authGetIsAuthenticated } from '@/features/auth/redux'

const Stack = createNativeStackNavigator<TAppRootStackNavigationParams>()
const AppRootStackNavigation = (): JSX.Element => {
	// Selector
	const appIsInitialized = useAppSelector(appGetInitialized)
	const authIsAuthenticated = useAppSelector(authGetIsAuthenticated)
	const appIsSplashIntroDone = useAppSelector(appGetIsSplashIntroDone)

	return (
		<Stack.Navigator
			initialRouteName={
				appIsInitialized && !authIsAuthenticated
					? E_APP_STACK_NAVIGATION.AUTH
					: appIsInitialized
					? E_APP_STACK_NAVIGATION.ENTRY_POINT
					: appIsSplashIntroDone
					? E_APP_STACK_NAVIGATION.SPLASH
					: E_APP_STACK_NAVIGATION.SPLASH_INTRO
			}
			screenOptions={{ headerShown: false }}
		>
			{!appIsSplashIntroDone && (
				<Stack.Screen
					name={E_APP_STACK_NAVIGATION.SPLASH_INTRO}
					component={AppSplashIntroScreen}
				/>
			)}

			{/* Check if app not initialized */}
			{!appIsInitialized && (
				<Stack.Screen
					name={E_APP_STACK_NAVIGATION.SPLASH}
					component={AppSplashScreen}
				/>
			)}

			{/* Check if app is initialized and user not authenticated */}
			{appIsInitialized && !authIsAuthenticated && (
				<Stack.Screen
					name={E_APP_STACK_NAVIGATION.AUTH}
					component={AuthStackNavigation}
				/>
			)}

			{/* Check if app is initialized and user is authenticated */}
			{appIsInitialized && authIsAuthenticated && (
				<>
					<Stack.Screen
						name={E_APP_STACK_NAVIGATION.APP}
						component={AppBottomTabNavigation}
					/>
					<Stack.Screen
						name={E_APP_STACK_NAVIGATION.STORE}
						component={StoreStackNavigation}
					/>
				</>
			)}
		</Stack.Navigator>
	)
}

export { AppRootStackNavigation }
