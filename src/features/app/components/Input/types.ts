// Native Base
import { IInputProps } from 'native-base'

export interface IAppInputProps extends IInputProps {
	inputLabel?: string
	inputType?: 'date' | 'time'
	error?: { message?: any; values?: { [key: string]: any } }
}
