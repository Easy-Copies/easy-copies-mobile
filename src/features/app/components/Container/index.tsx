// React
import { memo } from 'react'

// Interfaces
import { IAppContainerProps } from './types'

// Components
import { StyledView } from './components'

const AppContainer = memo(
	({ children, withoutHeight, ...rest }: IAppContainerProps) => {
		return (
			<StyledView
				{...rest}
				style={{
					height: withoutHeight ? undefined : '100%'
				}}
			>
				{children}
			</StyledView>
		)
	}
)

AppContainer.displayName = 'AppContainer'

export { AppContainer }
