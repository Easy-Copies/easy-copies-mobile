export interface IAppSelectProps {
	inputLabel?: string
	files: {
		name: string
		format: string
		size: number
		file: string
	}[]
	onChangeFile: (file: IAppSelectProps['files']) => void
	error?: { message?: any; values?: { [key: string]: any } }
}
