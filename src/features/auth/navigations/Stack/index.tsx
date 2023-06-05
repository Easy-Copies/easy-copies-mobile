// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Auth Screens
import { LoginScreen } from '@/features/auth/screens'

// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// Interfaces
import { TAuthStackNavigationParams } from './types'

const Stack = createNativeStackNavigator<TAuthStackNavigationParams>()
const AuthStackNavigation = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName={E_AUTH_STACK_NAVIGATION.LOGIN}
		>
			<Stack.Screen
				name={E_AUTH_STACK_NAVIGATION.LOGIN}
				component={LoginScreen}
			/>
		</Stack.Navigator>
	)
}

export { AuthStackNavigation }
