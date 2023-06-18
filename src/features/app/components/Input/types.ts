// Native Base
import { IInputProps } from 'native-base'

export interface IAppInputProps extends IInputProps {
	inputLabel?: string
	inputType?: 'date' | 'time'
	onChangeDateTime?: (date: Date | undefined) => void
	dateValue?: Date
	error?: { message?: any; values?: { [key: string]: any } }
}
