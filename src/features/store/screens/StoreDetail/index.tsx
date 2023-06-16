// React
import { memo } from 'react'

// Components
import { AppContainer, AppText, AppWrapper } from '@/features/app/components'

const StoreDetailScreen = memo(() => {
	return (
		<AppWrapper>
			<AppContainer>
				<AppText>Store Detail</AppText>
			</AppContainer>
		</AppWrapper>
	)
})

StoreDetailScreen.displayName = 'StoreDetailScreen'

export { StoreDetailScreen }
