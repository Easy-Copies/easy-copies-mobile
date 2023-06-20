// React
import { memo, useState, useCallback, useEffect } from 'react'

// Components
import {
	AppAlertDialog,
	AppInput,
	useAppToast
} from '@/features/app/components'

// Types
import { TRejectDialogProps } from './types'
import { TTransactionApprovalCancelForm } from '@/features/transaction/children/transaction-approval/types'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Redux
import { useTransactionApproval_cancelMutation } from '@/features/transaction/children/transaction-approval/redux'

// Constants
import { TRANSACTION_APPROVAL_CANCEL_FORM } from '@/features/transaction/children/transaction-approval/constants/transaction-form.constant'

// Form Validation
const formSchema = yup.object({
	cancelReason: yup.string().required()
})

const TransactionRejectDialog = memo(
	({ isOpen, transactionId, onClose, onConfirm }: TRejectDialogProps) => {
		// Common State
		const [dialogOptions, setDialogOptions] = useState<{
			isConfirmationOpen: boolean
		}>({ isConfirmationOpen: false })

		// Form
		const {
			control,
			formState: { errors, isValid },
			handleSubmit,
			reset
		} = useForm({
			defaultValues: {
				...TRANSACTION_APPROVAL_CANCEL_FORM
			},
			mode: 'all',
			resolver: yupResolver(formSchema)
		})

		// Toast
		const toast = useAppToast()

		// RTK
		const [cancelTransaction, { isLoading: isCancelTransactionLoading }] =
			useTransactionApproval_cancelMutation()

		// Watch any change when opening dialog
		useEffect(() => {
			if (isOpen) {
				reset()
			}
		}, [isOpen, reset])

		/**
		 * @description Handle dialog
		 *
		 * @param {string} type
		 * @param {boolean} value
		 *
		 * @return {void} void
		 */
		const handleDialog = useCallback(
			(type: keyof typeof dialogOptions, value: boolean) => {
				setDialogOptions(previousDialogOptions => ({
					...previousDialogOptions,
					[type]: value
				}))
			},
			[]
		)

		/**
		 * @description Submit confirmation
		 *
		 * @return {void} void
		 */
		const onSubmitConfirmation = useCallback(() => {
			handleDialog('isConfirmationOpen', true)
		}, [handleDialog])

		/**
		 * @description Handle submit
		 *
		 * @param {TTransactionApprovalCancelForm} form
		 *
		 * @return {Promise<void>} Promise<void>
		 */
		const onSubmit = useCallback(
			async (form: TTransactionApprovalCancelForm): Promise<void> => {
				try {
					const cancelTransactionResponse = await cancelTransaction({
						params: { transactionId },
						body: form
					}).unwrap()

					// Show Toast
					toast.show({ description: cancelTransactionResponse.message })

					// Close and confirm
					onClose()
					onConfirm()
				} catch (_) {
					//
				}
			},
			[cancelTransaction, transactionId, toast, onClose, onConfirm]
		)

		return (
			<>
				{/* Form */}
				<AppAlertDialog
					isOpen={isOpen}
					onClose={() => onClose()}
					onConfirm={onSubmitConfirmation}
					yesTitle='Cancel'
					isYesDisabled={!isValid}
					isYesLoading={isCancelTransactionLoading}
					noCancelButton
				>
					{/* Sender Name */}
					<Controller
						control={control}
						name='cancelReason'
						render={({ field: { onChange, ...fieldRest } }) => {
							return (
								<AppInput
									{...fieldRest}
									onChangeText={onChange}
									error={errors.cancelReason}
									inputLabel={'Alasan Cancel'}
								/>
							)
						}}
					/>
				</AppAlertDialog>

				{/* Alert Confirmation */}
				<AppAlertDialog
					isOpen={dialogOptions.isConfirmationOpen}
					title={'Reject Transaction'}
					description={
						'Are you sure want to reject transaction? You cannot go back after confirm'
					}
					onClose={() => handleDialog('isConfirmationOpen', false)}
					onConfirm={() => {
						handleDialog('isConfirmationOpen', false)
						handleSubmit(onSubmit)()
					}}
				/>
				{/* End Alert Confirmation */}
			</>
		)
	}
)

TransactionRejectDialog.displayName = 'TransactionRejectDialog'

export { TransactionRejectDialog }
