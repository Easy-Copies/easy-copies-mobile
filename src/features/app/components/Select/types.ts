// React
import { ComponentProps } from 'react'

// Native Base
import { Select } from 'native-base'

export interface IAppSelectProps extends ComponentProps<typeof Select> {
	inputLabel?: string
	items: { label: string; value: any }[]
	error?: { message?: any; values?: { [key: string]: any } }
}
