// React
import { memo } from 'react'

// Components
import { StyledEasyCopiesImage, StyledBody } from './components'

// Types
import { TAuthLayoutProps } from './types'

// Native Base
import { Column } from 'native-base'

const AuthLayout = memo(({ children }: TAuthLayoutProps) => {
	return (
		<>
			{/* Header */}
			<Column
				alignItems={'center'}
				justifyContent={'center'}
				w={'100%'}
				h='1/5'
			>
				<StyledEasyCopiesImage />
			</Column>

			{/* Body */}
			<Column h='100%'>
				<StyledBody>{children}</StyledBody>
			</Column>
		</>
	)
})

AuthLayout.displayName = 'AuthLayout'

export { AuthLayout }
