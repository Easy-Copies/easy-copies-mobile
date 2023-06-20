export type TRejectDialogProps = {
	isOpen: boolean
	transactionId: string
	onClose: () => void
	onConfirm: () => void
}
