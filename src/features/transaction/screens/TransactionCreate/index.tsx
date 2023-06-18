// React
import { memo, useEffect } from 'react'

// Components
import { AppWrapper } from '@/features/app/components'
import { TransactionForm } from './components'

// Types
import { TTransactionCreateScreenProps } from './types'

// Constants
import { E_STORE_STACK_NAVIGATION } from '@/features/app/constants'

const TransactionCreateScreen = memo(
	({ navigation, route }: TTransactionCreateScreenProps) => {
		// Remove bottom tab, if user came from StoreDetail screen
		useEffect(() => {
			if (route.params?.from === E_STORE_STACK_NAVIGATION.STORE_DETAIL) {
				navigation.getParent()?.setOptions({
					tabBarStyle: {
						display: 'none'
					}
				})
				return () =>
					navigation.getParent()?.setOptions({
						tabBarStyle: undefined
					})
			}
		}, [navigation, route.params?.from])

		return (
			<AppWrapper>
				<TransactionForm />
			</AppWrapper>
		)
	}
)

TransactionCreateScreen.displayName = 'TransactionCreateScreen'

export { TransactionCreateScreen }
