// React Navigation - Drawer Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Home Navigation
import { HomeStackNavigation } from '@/features/home/navigations'

// Transaction Navigation
import { TransactionStackNavigation } from '@/features/transaction/navigations'

// i18n
import { useTranslation } from 'react-i18next'

// Interfaces
import { TAppBottomTabNavigationParams } from './types'

// Constants
import { E_APP_BOTTOM_TAB_NAVIGATION } from '@/features/app/constants'

const BottomTab = createBottomTabNavigator<TAppBottomTabNavigationParams>()
const AppBottomTabNavigation = (): JSX.Element => {
	// Translation
	const { t } = useTranslation()

	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name={E_APP_BOTTOM_TAB_NAVIGATION.HOME}
				component={HomeStackNavigation}
				options={{
					title: t('app.menu.home') as string,
					headerShown: false
				}}
			/>
			<BottomTab.Screen
				name={E_APP_BOTTOM_TAB_NAVIGATION.TRANSACTION}
				component={TransactionStackNavigation}
				options={{
					title: t('app.menu.transaction') as string,
					headerShown: false
				}}
			/>
		</BottomTab.Navigator>
	)
}

export { AppBottomTabNavigation }
