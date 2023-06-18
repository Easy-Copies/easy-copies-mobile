// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Store Screens
import { TransactionCreateScreen } from '@/features/transaction/screens'

// Constants
import { E_TRANSACTION_STACK_NAVIGATION } from '@/features/app/constants'

// Interfaces
import { TTransactionStackNavigationParams } from './types'

// Components
import { AppNavigationHeader } from '@/features/app/components/NavigationHeader'

const Stack = createNativeStackNavigator<TTransactionStackNavigationParams>()
const TransactionStackNavigation = (): JSX.Element => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={E_TRANSACTION_STACK_NAVIGATION.TRANSACTION_CREATE}
				component={TransactionCreateScreen}
				options={{
					header: props => {
						const params = props.route
							.params as TTransactionStackNavigationParams[E_TRANSACTION_STACK_NAVIGATION.TRANSACTION_CREATE]

						return (
							<AppNavigationHeader
								isFromSomeWhere={props?.back !== undefined}
								title={params.storeService}
								navigation={props.navigation}
							/>
						)
					}
				}}
			/>
		</Stack.Navigator>
	)
}

export { TransactionStackNavigation }
