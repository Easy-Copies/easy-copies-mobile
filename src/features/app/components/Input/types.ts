// Native Base
import { IInputProps } from 'native-base'

export interface IAppInputProps extends IInputProps {
	inputLabel?: string
	error?: { message?: any }
}
