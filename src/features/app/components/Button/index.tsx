// React
import { memo } from 'react'

// Components
import { StyledButton } from './components'

// Interfaces
import { TAppButtonProps } from './types'

const AppButton = memo(({ children, ...rest }: TAppButtonProps) => {
	return (
		<StyledButton
			{...rest}
			_text={{
				fontWeight: 700 || rest?._text?.fontWeight,
				textTransform: 'uppercase' || rest?._text?.textTransform,
				...rest._text
			}}
		>
			{children}
		</StyledButton>
	)
})

AppButton.displayName = 'AppButton'

export { AppButton }
