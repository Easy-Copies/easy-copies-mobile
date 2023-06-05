// React
import { ComponentProps } from 'react'

// Native Base
import { Alert } from 'native-base'

type AlertProps = ComponentProps<typeof Alert>

export type TAppToastProps = {
	title: string
	variant: AlertProps['variant']
	description: string
	status: AlertProps['status']
}
