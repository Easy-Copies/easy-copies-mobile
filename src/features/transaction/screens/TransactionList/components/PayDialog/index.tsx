// React
import { memo, useState, useCallback, useEffect } from 'react'

// Components
import {
	AppAlertDialog,
	AppInput,
	AppFileUpload,
	useAppToast
} from '@/features/app/components'

// Types
import { TPayDialogProps } from './types'
import { TTransactionPayForm } from '@/features/transaction/types'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { TRANSACTION_PAY_FORM } from '@/features/transaction/constants/transaction-form.constant'

// Redux
import { useTransaction_payMutation } from '@/features/transaction/redux'

// Form Validation
const formSchema = yup.object({
	senderName: yup.string().required(),
	bankName: yup.string().required(),
	accountNumber: yup.string().required(),
	file: yup.object().shape({
		name: yup.string().required(),
		format: yup.string().required(),
		size: yup.number().required(),
		file: yup.string().required()
	})
})

const TransactionPayDialog = memo(
	({ isOpen, transactionId, onClose, onConfirm }: TPayDialogProps) => {
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
				...TRANSACTION_PAY_FORM
			},
			mode: 'all',
			resolver: yupResolver(formSchema)
		})

		// Toast
		const toast = useAppToast()

		// RTK
		const [payTransaction, { isLoading: isPayTransactionLoading }] =
			useTransaction_payMutation()

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
		 * @param {TTransactionPayForm} form
		 *
		 * @return {Promise<void>} Promise<void>
		 */
		const onSubmit = useCallback(
			async (form: TTransactionPayForm): Promise<void> => {
				try {
					const payTransactionResponse = await payTransaction({
						params: { transactionId },
						body: form
					}).unwrap()

					// Show Toast
					toast.show({ description: payTransactionResponse.message })

					// Close and confirm
					onClose()
					onConfirm()
				} catch (_) {
					//
				}
			},
			[payTransaction, transactionId, toast, onClose, onConfirm]
		)

		return (
			<>
				{/* Form */}
				<AppAlertDialog
					isOpen={isOpen}
					onClose={() => onClose()}
					onConfirm={onSubmitConfirmation}
					yesTitle='Konfirmasi Bayar'
					isYesDisabled={!isValid}
					isYesLoading={isPayTransactionLoading}
					noCancelButton
				>
					{/* Sender Name */}
					<Controller
						control={control}
						name='senderName'
						render={({ field: { onChange, ...fieldRest } }) => {
							return (
								<AppInput
									{...fieldRest}
									onChangeText={onChange}
									error={errors.senderName}
									inputLabel={'transaction.formPay.senderName'}
								/>
							)
						}}
					/>

					{/* Bank Name */}
					<Controller
						control={control}
						name='bankName'
						render={({ field: { onChange, ...fieldRest } }) => {
							return (
								<AppInput
									{...fieldRest}
									onChangeText={onChange}
									error={errors.bankName}
									inputLabel={'transaction.formPay.bankName'}
								/>
							)
						}}
					/>

					{/* Account Number */}
					<Controller
						control={control}
						name='accountNumber'
						render={({ field: { onChange, ...fieldRest } }) => {
							return (
								<AppInput
									{...fieldRest}
									onChangeText={onChange}
									error={errors.accountNumber}
									keyboardType='numeric'
									inputLabel={'transaction.formPay.accountNumber'}
								/>
							)
						}}
					/>

					{/* File Upload */}
					<Controller
						control={control}
						name='file'
						render={({ field: { onChange, value } }) => {
							return (
								<AppFileUpload
									file={value}
									onChangeFile={onChange}
									error={errors.file}
									inputLabel={'transaction.formPay.photoUpload'}
								/>
							)
						}}
					/>
				</AppAlertDialog>
				{/* End Form */}

				{/* Alert Confirmation */}
				<AppAlertDialog
					isOpen={dialogOptions.isConfirmationOpen}
					title={'Payment Confirmation'}
					description={
						'Are you sure want to pay? Your transaction will go to Waiting Confirmation'
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

TransactionPayDialog.displayName = 'TransactionPayDialog'

export { TransactionPayDialog }
