// React
import { memo } from 'react'

// Interfaces
import { TAppViewProps } from './types'

// Components
import { StyledView } from './components'

const AppView = memo(({ ...rest }: TAppViewProps) => {
	return <StyledView {...rest}>{rest.children}</StyledView>
})

AppView.displayName = 'AppView'

export { AppView }
