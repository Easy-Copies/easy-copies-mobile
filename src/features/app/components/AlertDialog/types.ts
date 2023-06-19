// React
import { ReactNode } from 'react'

export type TAppAlertDialogProps = {
	isOpen: boolean
	title?: string
	description?: string
	cancelTitle?: string
	yesTitle?: string
	onClose: () => void
	onConfirm: () => void
	children?: ReactNode
	noCancelButton?: boolean
	isYesDisabled?: boolean
	isYesLoading?: boolean
}
