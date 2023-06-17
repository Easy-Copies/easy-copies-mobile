// React
import { memo, useCallback } from 'react'

// Components
import {
	AppContainer,
	AppButton,
	AppSelect,
	AppView,
	AppText,
	AppInput
} from '@/features/app/components'
import { StyledStickyBottom } from './components'

// Native Base
import { ScrollView } from 'native-base'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Constants
import { TRANSACTION_CREATE_FORM } from '@/features/transaction/constants/transaction-form.constant'

// i18n
import { useTranslation } from 'react-i18next'

// React Navigation
import { useRoute } from '@react-navigation/native'

// Types
import { TTransactionCreateScreenProps } from '@/features/transaction/screens/TransactionCreate/types'
import { TTransactionForm } from '@/features/transaction/types'

// Utils
import { appOnlyNumber } from '@/features/app/utils/app.utils'

// Form Validation
const formSchema = yup.object({
	storeService: yup.string().required(),
	paperType: yup.string().required(),
	inkType: yup.string().required(),
	sheetLength: yup.number().required(),
	pickupDate: yup.string().required(),
	responsiblePerson: yup.string().required(),
	description: yup.string().required(),
	files: yup.array().of(
		yup.object().shape({
			name: yup.string().required(),
			format: yup.string().required(),
			size: yup.number().required(),
			file: yup.string().required()
		})
	)
})

const TransactionForm = memo(() => {
	// Translation
	const { t } = useTranslation()

	// Route
	const route = useRoute<TTransactionCreateScreenProps['route']>()

	// Form
	const {
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			...TRANSACTION_CREATE_FORM,
			storeService: route.params.storeService
		},
		mode: 'all',
		resolver: yupResolver(formSchema)
	})

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
				console.log('form', form)
			} catch (_) {
				//
			}
		},
		[]
	)

	return (
		<>
			{/* Form */}
			<ScrollView>
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
										{ label: t('app.inkType.blackWhite'), value: 'BlackWhite' }
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
								<AppInput
									{...fieldRest}
									value={value.toString()}
									onChangeText={value => {
										if (appOnlyNumber(value)) {
											if (Number(value) > 999) {
												onChange(999)
											} else {
												onChange(Number(value))
											}
										}
									}}
									error={errors.sheetLength}
									keyboardType='numeric'
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
									value={value.toString()}
									onChangeText={value => {
										if (appOnlyNumber(value)) {
											if (Number(value) > 999) {
												onChange(999)
											} else {
												onChange(Number(value))
											}
										}
									}}
									inputType={'date'}
									error={errors.pickupDate}
									inputLabel={'transaction.form.pickupDate'}
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
							Rp 28000
						</AppText>
					</AppView>
					{/* End Total Price */}

					{/* Confirmation Button */}
					<AppButton
						width={'150px'}
						height={'40px'}
						backgroundColor={'primary.400'}
						_text={{ textTransform: 'none' }}
						onPress={handleSubmit(onSubmit)}
					>
						{t('transaction.makeOrder')}
					</AppButton>
					{/* End Confirmation Button */}
				</AppView>
			</StyledStickyBottom>
			{/* Sticky Bottom Bar */}
		</>
	)
})

TransactionForm.displayName = 'TransactionForm'

export { TransactionForm }
