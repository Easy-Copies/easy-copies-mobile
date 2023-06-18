// React
import { memo, useCallback, useState } from 'react'

// Components
import {
	AppContainer,
	AppButton,
	AppSelect,
	AppView,
	AppText,
	AppInput,
	AppFileUpload,
	useAppToast,
	AppAlertDialog
} from '@/features/app/components'
import { StyledStickyBottom } from './components'

// Native Base
import { ScrollView } from 'native-base'

// React Hook Form
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { TRANSACTION_CREATE_FORM } from '@/features/transaction/constants/transaction-form.constant'

// i18n
import { useTranslation } from 'react-i18next'

// React Navigation
import { useNavigation, useRoute } from '@react-navigation/native'

// Types
import { TTransactionCreateScreenProps } from '@/features/transaction/screens/TransactionCreate/types'
import { TTransactionForm } from '@/features/transaction/types'

// Redux
import { useTransaction_storeMutation } from '@/features/transaction/redux'

// Constants
import {
	E_APP_BOTTOM_TAB_NAVIGATION,
	E_APP_STACK_NAVIGATION
} from '@/features/app/constants'

// Form Validation
const formSchema = yup.object({
	storeService: yup.string().required(),
	paperType: yup.string().required(),
	inkType: yup.string().required(),
	sheetLength: yup.number().required(),
	pickupDate: yup.string().required(),
	responsiblePerson: yup.string().required(),
	description: yup.string(),
	files: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string().required(),
				format: yup.string().required(),
				size: yup.number().required(),
				file: yup.string().required()
			})
		)
		.min(1)
})

const TransactionForm = memo(() => {
	// Common State
	const [dialogOptions, setDialogOptions] = useState<{
		isConfirmationOpen: boolean
	}>({ isConfirmationOpen: false })

	// Translation
	const { t } = useTranslation()

	// Route
	const route = useRoute<TTransactionCreateScreenProps['route']>()

	// Navigation
	const navigation =
		useNavigation<TTransactionCreateScreenProps['navigation']>()

	// Form
	const {
		control,
		formState: { errors, isValid },
		handleSubmit
	} = useForm({
		defaultValues: {
			...TRANSACTION_CREATE_FORM,
			storeService: route.params.storeService
		},
		mode: 'all',
		resolver: yupResolver(formSchema)
	})
	const watchSheetLength = useWatch({ control, name: 'sheetLength' })

	// RTK
	const [createTransaction, { isLoading: isCreateTransactionLoading }] =
		useTransaction_storeMutation()

	// Toast
	const toast = useAppToast()

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
	 * @description Handle submit
	 *
	 * @param {TTransactionForm} form
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const onSubmit = useCallback(
		async (form: TTransactionForm): Promise<void> => {
			try {
				const createTransactionResponse = await createTransaction({
					params: { storeId: route.params.storeId },
					body: form
				}).unwrap()

				// Show Toast
				toast.show({ description: createTransactionResponse.message })

				// Navigate to home
				navigation.navigate(E_APP_STACK_NAVIGATION.APP, {
					screen: E_APP_BOTTOM_TAB_NAVIGATION.HOME
				})
			} catch (_) {
				//
			}
		},
		[createTransaction, route.params.storeId, toast, navigation]
	)

	/**
	 * @description Submit confirmation
	 *
	 * @return {void} void
	 */
	const onSubmitConfirmation = useCallback(() => {
		handleDialog('isConfirmationOpen', true)
	}, [handleDialog])

	return (
		<>
			{/* Form */}
			<ScrollView marginBottom={'90px'}>
				<AppContainer>
					{/* Paper Type */}
					<Controller
						control={control}
						name='paperType'
						render={({ field: { onChange, value } }) => {
							return (
								<AppSelect
									selectedValue={value}
									onValueChange={onChange}
									error={errors.paperType}
									items={[{ label: 'A4', value: 'A4' }]}
									inputLabel={'transaction.form.paperType'}
								/>
							)
						}}
					/>

					{/* Paper Type */}
					<Controller
						control={control}
						name='inkType'
						render={({ field: { onChange, value } }) => {
							return (
								<AppSelect
									selectedValue={value}
									onValueChange={onChange}
									error={errors.inkType}
									items={[
										{ label: t('app.inkType.color'), value: 'Color' },
										{
											label: t('app.inkType.blackWhite'),
											value: 'BlackWhite'
										}
									]}
									inputLabel={'transaction.form.inkType'}
								/>
							)
						}}
					/>

					{/* Sheet Length */}
					<Controller
						control={control}
						name='sheetLength'
						render={({ field: { onChange, value, ...fieldRest } }) => {
							return (
								<AppSelect
									{...fieldRest}
									selectedValue={value?.toString()}
									onValueChange={onChange}
									items={[...Array(10).keys()]
										.filter(length => length !== 0)
										.map(sheetLength => ({
											label: sheetLength.toString(),
											value: sheetLength.toString()
										}))}
									error={errors.sheetLength}
									inputLabel={'transaction.form.sheetLength'}
								/>
							)
						}}
					/>

					{/* Pickup Date */}
					<Controller
						control={control}
						name='pickupDate'
						render={({ field: { onChange, value, ...fieldRest } }) => {
							return (
								<AppInput
									{...fieldRest}
									onChangeDateTime={onChange}
									dateValue={value}
									inputType={'date'}
									error={errors.pickupDate}
									inputLabel={'transaction.form.pickupDate'}
								/>
							)
						}}
					/>

					{/* Responsible Name */}
					<Controller
						control={control}
						name='responsiblePerson'
						render={({ field: { onChange, ...fieldRest } }) => {
							return (
								<AppInput
									{...fieldRest}
									onChangeText={onChange}
									error={errors.responsiblePerson}
									inputLabel={'transaction.form.responsiblePerson'}
								/>
							)
						}}
					/>

					{/* Upload Files */}
					<Controller
						control={control}
						name='files'
						render={({ field: { onChange, value } }) => {
							return (
								<AppFileUpload
									files={value}
									onChangeFile={onChange}
									error={errors.responsiblePerson}
									inputLabel={'transaction.form.files'}
								/>
							)
						}}
					/>

					{/* Responsible Name */}
					<Controller
						control={control}
						name='description'
						render={({ field: { onChange, ...fieldRest } }) => {
							return (
								<AppInput
									{...fieldRest}
									onChangeText={onChange}
									error={errors.responsiblePerson}
									inputLabel={'transaction.form.description'}
								/>
							)
						}}
					/>
				</AppContainer>
			</ScrollView>
			{/* End Form */}

			{/* Sticky Bottom Bar */}
			<StyledStickyBottom>
				<AppView
					flexDirection={'row'}
					alignItems={'center'}
					justifyContent={'space-between'}
					textAlign={'right'}
					width={'100%'}
				>
					{/* Total Price */}
					<AppView>
						<AppText
							marginBottom={'5px'}
							fontSize={12}
							lineHeight={15}
							fontWeight={'500'}
						>
							{t('app.totalPrice')}
						</AppText>
						<AppText fontSize={18} lineHeight={22.5} fontWeight={'700'}>
							Rp {Number(watchSheetLength) * route.params.storePricePerSheet}
						</AppText>
					</AppView>
					{/* End Total Price */}

					{/* Confirmation Button */}
					<AppButton
						width={'150px'}
						height={'40px'}
						backgroundColor={'primary.400'}
						_text={{ textTransform: 'none' }}
						onPress={onSubmitConfirmation}
						isDisabled={!isValid}
						isLoading={isCreateTransactionLoading}
					>
						{t('transaction.makeOrder')}
					</AppButton>
					{/* End Confirmation Button */}
				</AppView>
			</StyledStickyBottom>
			{/* End Sticky Bottom Bar */}

			{/* Alert Confirmation */}
			<AppAlertDialog
				isOpen={dialogOptions.isConfirmationOpen}
				title={'Transaction Confirmation'}
				description={
					'Are you sure want to create transaction? This will be going to Payment Process'
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
})

TransactionForm.displayName = 'TransactionForm'

export { TransactionForm }
