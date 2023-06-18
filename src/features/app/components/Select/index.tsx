// React
import { forwardRef } from 'react'

// Interfaces
import { IAppSelectProps } from './types'

// Native Base
import { CheckIcon, FormControl, Select, WarningOutlineIcon } from 'native-base'

// Lodash
import omit from 'lodash.omit'

// i18n
import { useTranslation } from 'react-i18next'

const AppSelect = forwardRef(
	({ inputLabel, error, items, ...rest }: IAppSelectProps, ref) => {
		// Translation
		const { t } = useTranslation()

		return (
			<FormControl isInvalid={Boolean(error)} marginBottom={2.5} isReadOnly>
				{inputLabel && (
					<FormControl.Label
						marginBottom={2}
						_text={{
							fontSize: 14,
							fontWeight: 700,
							lineHeight: 20,
							color: 'primary.400'
						}}
					>
						{t(inputLabel)}
					</FormControl.Label>
				)}
				<Select
					{...omit(rest, ['ref'])}
					_selectedItem={{
						endIcon: <CheckIcon size='5' />,
						...rest?._selectedItem
					}}
					ref={ref as never}
				>
					{items.map(item => (
						<Select.Item key={item.value} {...item} />
					))}
				</Select>
				{error?.message?.key && (
					<FormControl.ErrorMessage
						leftIcon={<WarningOutlineIcon size='xs' />}
						_text={{
							fontSize: 'xs',
							color: 'error.400'
						}}
					>
						{t(error.message.key, {
							field: inputLabel ? t(inputLabel) : undefined,
							min: error.message?.values?.min
								? error.message.values.min
								: undefined,
							max: error.message?.values?.max
								? error.message.values.max
								: undefined
						})}
					</FormControl.ErrorMessage>
				)}
			</FormControl>
		)
	}
)

AppSelect.displayName = 'AppSelect'

export { AppSelect }
