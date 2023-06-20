// Types
import { TAppFile } from '@/features/app/types'

export interface IAppSelectProps {
	inputLabel?: string
	isMultiple?: boolean
	file?: TAppFile | null
	files?: TAppFile[]
	onChangeFile?: (file: IAppSelectProps['file']) => void
	onChangeFiles?: (file: IAppSelectProps['files']) => void
	error?: { message?: any; values?: { [key: string]: any } }
}
