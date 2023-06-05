// React
import { forwardRef } from 'react'

// Interfaces
import { IAppInputProps } from './types'

// Native Base
import { FormControl, Input, WarningOutlineIcon } from 'native-base'

// Lodash
import omit from 'lodash.omit'

// i18n
import { useTranslation } from 'react-i18next'

const AppInput = forwardRef(
	({ inputLabel, error, ...rest }: IAppInputProps, ref) => {
		// Translation
		const { t } = useTranslation()

		return (
			<FormControl isInvalid={Boolean(error)} marginBottom={2.5}>
				{inputLabel && (
					<FormControl.Label
						marginBottom={2}
						_text={{
							fontSize: 16,
							fontWeight: 600,
							lineHeight: 20,
							color: 'primary.400'
						}}
					>
						{t(inputLabel)}
					</FormControl.Label>
				)}
				<Input {...omit(rest, ['ref'])} ref={ref as never} />
				{error?.message?.key && (
					<FormControl.ErrorMessage
						leftIcon={<WarningOutlineIcon size='xs' />}
						_text={{
							fontSize: 'xs',
							color: 'error.400'
						}}
					>
						{t(error.message.key, {
							field: inputLabel ? t(inputLabel) : undefined
						})}
					</FormControl.ErrorMessage>
				)}
			</FormControl>
		)
	}
)

AppInput.displayName = 'AppInput'

export { AppInput }
