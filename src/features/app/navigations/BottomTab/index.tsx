// React Navigation - Drawer Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Home Navigation
import { HomeStackNavigation } from '@/features/home/navigations'

// Transaction Navigation
import { TransactionStackNavigation } from '@/features/transaction/navigations'

// Interfaces
import { TAppBottomTabNavigationParams } from './types'

// Constants
import { E_APP_BOTTOM_TAB_NAVIGATION } from '@/features/app/constants'

// Components
import { StyledHomeImage, StyledHistoryImage } from './components'

const BottomTab = createBottomTabNavigator<TAppBottomTabNavigationParams>()
const AppBottomTabNavigation = (): JSX.Element => {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name={E_APP_BOTTOM_TAB_NAVIGATION.HOME}
				component={HomeStackNavigation}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => <StyledHomeImage isActive={focused} />,
					headerShown: false
				}}
			/>
			<BottomTab.Screen
				name={E_APP_BOTTOM_TAB_NAVIGATION.TRANSACTION}
				component={TransactionStackNavigation}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ focused }) => (
						<StyledHistoryImage isActive={focused} />
					),
					headerShown: false
				}}
			/>
		</BottomTab.Navigator>
	)
}

export { AppBottomTabNavigation }
