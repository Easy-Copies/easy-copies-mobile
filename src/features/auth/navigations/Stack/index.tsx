// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Auth Screens
import {
	LoginScreen,
	RegisterScreen,
	ForgotPasswordScreen,
	ChangePasswordScreen,
	OtpVerifyScreen
} from '@/features/auth/screens'

// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'

// Interfaces
import { TAuthStackNavigationParams } from './types'

const Stack = createNativeStackNavigator<TAuthStackNavigationParams>()
const AuthStackNavigation = (): JSX.Element => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				headerShadowVisible: false
			}}
			initialRouteName={E_AUTH_STACK_NAVIGATION.LOGIN}
		>
			<Stack.Screen
				name={E_AUTH_STACK_NAVIGATION.LOGIN}
				component={LoginScreen}
			/>
			<Stack.Screen
				name={E_AUTH_STACK_NAVIGATION.REGISTER}
				component={RegisterScreen}
			/>
			<Stack.Screen
				name={E_AUTH_STACK_NAVIGATION.OTP_VERIFY}
				component={OtpVerifyScreen}
				options={{
					headerShown: true,
					headerTitle: ''
				}}
			/>
			<Stack.Screen
				name={E_AUTH_STACK_NAVIGATION.FORGOT_PASSWORD}
				component={ForgotPasswordScreen}
				options={{
					headerShown: true,
					headerTitle: ''
				}}
			/>
			<Stack.Screen
				name={E_AUTH_STACK_NAVIGATION.CHANGE_PASSWORD}
				component={ChangePasswordScreen}
				options={{
					headerShown: true,
					headerTitle: ''
				}}
			/>
		</Stack.Navigator>
	)
}

export { AuthStackNavigation }
