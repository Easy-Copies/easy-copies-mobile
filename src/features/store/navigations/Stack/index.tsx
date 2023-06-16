// React Navigation - Stack Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Store Screens
import { StoreDetailScreen, StoreListScreen } from '@/features/store/screens'

// Constants
import { E_STORE_STACK_NAVIGATION } from '@/features/app/constants'

// Interfaces
import { TStoreStackNavigationParams } from './types'

// Components
import { AppNavigationHeader } from '@/features/app/components/NavigationHeader'

// i18n
import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator<TStoreStackNavigationParams>()
const StoreStackNavigation = (): JSX.Element => {
	// Translation
	const { t } = useTranslation()

	return (
		<Stack.Navigator initialRouteName={E_STORE_STACK_NAVIGATION.STORE_LIST}>
			<Stack.Screen
				name={E_STORE_STACK_NAVIGATION.STORE_LIST}
				component={StoreListScreen}
				options={{
					header: props => {
						return (
							<AppNavigationHeader
								isFromSomeWhere={props?.back !== undefined}
								title={t('store.storeList')}
								navigation={props.navigation}
							/>
						)
					}
				}}
			/>
			<Stack.Screen
				name={E_STORE_STACK_NAVIGATION.STORE_DETAIL}
				component={StoreDetailScreen}
				options={{
					header: props => {
						const { name } = props.route.params as { name: string }

						return (
							<AppNavigationHeader
								isFromSomeWhere={props?.back !== undefined}
								title={name}
								navigation={props.navigation}
							/>
						)
					}
				}}
			/>
		</Stack.Navigator>
	)
}

export { StoreStackNavigation }
