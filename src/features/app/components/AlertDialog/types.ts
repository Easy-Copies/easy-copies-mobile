export type TAppAlertDialogProps = {
	isOpen: boolean
	title: string
	description: string
	cancelTitle?: string
	yesTitle?: string
	onClose: () => void
	onConfirm: () => void
}
