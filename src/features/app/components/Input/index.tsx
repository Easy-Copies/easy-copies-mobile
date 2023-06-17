// React
import { forwardRef, useReducer } from 'react'

// Interfaces
import { IAppInputProps } from './types'

// Native Base
import { FormControl, Input, Pressable, WarningOutlineIcon } from 'native-base'

// Lodash
import omit from 'lodash.omit'

// i18n
import { useTranslation } from 'react-i18next'

// React Native Date Time Picker
import DateTimePicker from '@react-native-community/datetimepicker'

// Reducers
import {
	datePickerOptionsReducer,
	EDatePickerOptionsActionType
} from './reducers/date-time-picker.reducer'

// Components
import { StyledDatePickerImage } from './components'

const AppInput = forwardRef(
	({ inputLabel, error, inputType, ...rest }: IAppInputProps, ref) => {
		// Translation
		const { t } = useTranslation()

		// Common State
		const [dateTimePickerOptions, datePickerPickerOptionsDispatch] = useReducer(
			datePickerOptionsReducer,
			{
				date: new Date(),
				mode: 'date',
				show: false
			}
		)

		return (
			<FormControl isInvalid={Boolean(error)} marginBottom={2.5}>
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
				{inputType && ['date', 'time'].includes(inputType) ? (
					<>
						<Pressable
							zIndex={2}
							width={'100%'}
							height={'100%'}
							backgroundColor={'red.400'}
							onPress={() => {
								datePickerPickerOptionsDispatch({
									type: EDatePickerOptionsActionType.SET_SHOW,
									payload: true
								})
								datePickerPickerOptionsDispatch({
									type: EDatePickerOptionsActionType.SET_MODE,
									payload: inputType
								})
							}}
						>
							<Input
								{...omit(rest, ['ref'])}
								ref={ref as never}
								InputRightElement={<StyledDatePickerImage />}
								zIndex={1}
								isReadOnly
							/>
						</Pressable>

						{/* Date Time Picker */}
						{dateTimePickerOptions.show && (
							<DateTimePicker
								value={dateTimePickerOptions.date}
								mode={dateTimePickerOptions.mode}
								is24Hour={true}
								onChange={(_, selectedDate) => {
									console.log('SELECTED DATE', selectedDate)
								}}
							/>
						)}
					</>
				) : (
					<Input {...omit(rest, ['ref'])} ref={ref as never} />
				)}

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

AppInput.displayName = 'AppInput'

export { AppInput }
