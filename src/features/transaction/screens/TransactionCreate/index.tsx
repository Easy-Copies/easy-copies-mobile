// React
import { memo } from 'react'

// Components
import { AppWrapper } from '@/features/app/components'
import { TransactionForm } from './components'

const TransactionCreateScreen = memo(() => {
	return (
		<AppWrapper>
			<TransactionForm />
		</AppWrapper>
	)
})

TransactionCreateScreen.displayName = 'TransactionCreateScreen'

export { TransactionCreateScreen }
