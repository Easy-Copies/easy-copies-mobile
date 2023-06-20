// React
import { memo, useCallback, useEffect, useState } from 'react'

import { Platform } from 'react-native'

// Components
import {
	AppContainer,
	AppText,
	AppView,
	AppWrapper,
	AppButton,
	AppAlertDialog
} from '@/features/app/components'
import {
	StyledTransactionCard,
	StyledTransactionStatus,
	TransactionPayDialog,
	TransactionRejectDialog
} from './components'

// Native Base
import { Divider, FlatList, ScrollView } from 'native-base'

// Types
import { ETransactionApprovalStatus } from '@/features/transaction/types'

// Redux
import { useLazyTransaction_indexQuery } from '@/features/transaction/redux'
import { useTransactionApproval_handleMutation } from '@/features/transaction/children/transaction-approval/redux'
import { authGetIsCanDoTransactionApproval } from '@/features/auth/redux'

// React Native Responsive
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

// Plugins
import { useAppSelector } from '@/plugins'

const TransactionListScreen = memo(() => {
	// Common State
	const [currentTransactionStatus, setCurrentTransactionStatus] = useState<
		ETransactionApprovalStatus | undefined
	>(undefined)
	const [currentTransactionId, setCurrentTransactionId] = useState<string>('')
	const [currentApprovalStatus, setCurrentApprovalStatus] =
		useState<ETransactionApprovalStatus | null>(null)
	const [dialogOptions, setDialogOptions] = useState<{
		isPayOpen: boolean
		isConfirmationOpen: boolean
		isRejectOpen: boolean
	}>({ isPayOpen: false, isConfirmationOpen: false, isRejectOpen: false })

	// Selector
	const authIsCanDoTransactionApproval = useAppSelector(
		authGetIsCanDoTransactionApproval
	)

	// RTK
	const [
		getTransactionList,
		{
			data: transactionList,
			isLoading: isTransactionListLoading,
			isFetching: isTransactionListFetching
		}
	] = useLazyTransaction_indexQuery()
	const [handleTransaction, { isLoading: isHandleTransactionLoading }] =
		useTransactionApproval_handleMutation()

	/**
	 * @description Fetch transaction list
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const fetchTransactionList = useCallback(async (): Promise<void> => {
		try {
			await getTransactionList({
				params: { status: currentTransactionStatus }
			}).unwrap()
		} catch (_) {
			//
		}
	}, [getTransactionList, currentTransactionStatus])

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

	// Do when user came to this screen
	useEffect(() => {
		fetchTransactionList()
	}, [fetchTransactionList])

	/**
	 * @description Render Status by Indonesia
	 *
	 * @param {ETransactionApprovalStatus} englishStatus
	 *
	 * @return {string} string
	 */
	const statusByIndonesia = useCallback(
		(
			englishStatus: ETransactionApprovalStatus
		): {
			text: string
			color: string
			action: string
			nextStatus: ETransactionApprovalStatus | null
		} => {
			switch (englishStatus) {
				case ETransactionApprovalStatus.WaitingPayment:
					return {
						text: 'Menunggu Pembayaran',
						color: 'blue.400',
						action: 'Proses',
						nextStatus: ETransactionApprovalStatus.WaitingConfirmation
					}
				case ETransactionApprovalStatus.WaitingConfirmation:
					return {
						text: 'Menunggu Persetujuan',
						color: 'cyan.400',
						action: 'Proses',
						nextStatus: ETransactionApprovalStatus.OnProcess
					}
				case ETransactionApprovalStatus.OnProcess:
					return {
						text: 'Sedang Diproses',
						color: 'yellow.400',
						action: 'Siap Untuk Diambil',
						nextStatus: ETransactionApprovalStatus.ReadyToPickup
					}
				case ETransactionApprovalStatus.ReadyToPickup:
					return {
						text: 'Siap Diambil',
						color: 'orange.400',
						action: 'Selesai',
						nextStatus: ETransactionApprovalStatus.Done
					}
				case ETransactionApprovalStatus.Done:
					return {
						text: 'Selesai',
						color: 'green.400',
						action: '',
						nextStatus: null
					}
				case ETransactionApprovalStatus.Canceled:
					return {
						text: 'Dibatalkan',
						color: 'red.400',
						action: '',
						nextStatus: null
					}
				default:
					return {
						text: englishStatus,
						color: '',
						action: '',
						nextStatus: null
					}
			}
		},
		[]
	)

	return (
		<AppWrapper>
			<AppContainer>
				{/* Transaction Status */}
				<AppView marginBottom={'10px'}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{['Semua', ...Object.values(ETransactionApprovalStatus)].map(
							transactionStatus => (
								<StyledTransactionStatus
									marginRight={2.5}
									key={transactionStatus}
									onPress={() =>
										setCurrentTransactionStatus(() =>
											transactionStatus === 'Semua'
												? undefined
												: (transactionStatus as ETransactionApprovalStatus)
										)
									}
									isActive={
										currentTransactionStatus === transactionStatus ||
										(transactionStatus === 'Semua' &&
											currentTransactionStatus === undefined)
									}
								>
									<AppText fontSize={12} lineHeight={15} fontWeight={'500'}>
										{
											statusByIndonesia(
												transactionStatus as ETransactionApprovalStatus
											).text
										}
									</AppText>
								</StyledTransactionStatus>
							)
						)}
					</ScrollView>
				</AppView>
				{/* End Transaction Status */}

				{/* Transaction List */}
				{isTransactionListLoading ? (
					<AppText>Loading...</AppText>
				) : (
					transactionList?.result && (
						<FlatList
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{
								paddingBottom: Platform.OS === 'android' ? 10 : undefined
							}}
							data={transactionList.result?.rows}
							keyExtractor={item => item.id}
							refreshing={isTransactionListFetching}
							onRefresh={() => fetchTransactionList()}
							renderItem={({ item }) => (
								<StyledTransactionCard marginBottom={'10px'}>
									{/* Title And Status */}
									<AppView
										flexDirection={'row'}
										alignItems={'center'}
										justifyContent={'space-between'}
									>
										<AppText fontSize={10}>{item.storeServiceType}</AppText>
										<AppText
											fontSize={10}
											color={
												statusByIndonesia(
													item.status as ETransactionApprovalStatus
												).color
											}
										>
											{
												statusByIndonesia(
													item.status as ETransactionApprovalStatus
												).text
											}
										</AppText>
									</AppView>
									{/* End Title And Status */}

									{/* Divider */}
									<Divider marginTop={'10px'} marginBottom={'10px'} />

									{/* Description and Other Details */}
									<AppView>
										{item?.description && (
											<AppText
												fontSize={12}
												marginBottom={'5px'}
												fontWeight={'700'}
												lineHeight={15}
											>
												{item.description}
											</AppText>
										)}
										<AppText fontSize={9}>
											Jumlah: {item.sheetLength} Halaman
										</AppText>
										<AppText fontSize={9}>
											Tanggal Buat: {item.createdAt}
										</AppText>
										<AppText fontSize={9}>
											Tanggal Ambil: {item.pickupDate}
										</AppText>

										<AppView
											alignItems={'center'}
											justifyContent={'space-between'}
											flexDirection={'row'}
											marginTop={'10px'}
										>
											<AppView>
												<AppText fontSize={9}>Harga</AppText>
												<AppText
													fontSize={12}
													fontWeight={'700'}
													lineHeight={15}
												>
													Rp. {item.totalPrice}
												</AppText>
											</AppView>
										</AppView>

										{item.status !== ETransactionApprovalStatus.Done && (
											<>
												<Divider marginTop={'10px'} marginBottom={'10px'} />

												<AppView
													flexDirection={'row'}
													justifyContent={'space-between'}
												>
													{item.status ===
														ETransactionApprovalStatus.WaitingPayment && (
														<AppView>
															<AppButton
																height={hp('4%')}
																_text={{
																	fontSize: '10px'
																}}
																onPress={() => {
																	setCurrentTransactionId(item.id)
																	handleDialog('isRejectOpen', true)
																}}
																colorScheme='danger'
															>
																Cancel
															</AppButton>
														</AppView>
													)}

													{item.status ===
														ETransactionApprovalStatus.WaitingPayment && (
														<AppView>
															<AppButton
																backgroundColor={'primary.400'}
																height={hp('4%')}
																_text={{
																	fontSize: '10px'
																}}
																onPress={() => {
																	setCurrentTransactionId(item.id)
																	handleDialog('isPayOpen', true)
																}}
															>
																Upload Bukti Bayar
															</AppButton>
														</AppView>
													)}

													{authIsCanDoTransactionApproval &&
														item.status !==
															ETransactionApprovalStatus.WaitingPayment &&
														statusByIndonesia(
															item.status as ETransactionApprovalStatus
														).nextStatus && (
															<AppView>
																<AppButton
																	backgroundColor={'primary.400'}
																	height={hp('4%')}
																	_text={{
																		fontSize: '10px'
																	}}
																	onPress={() => {
																		setCurrentTransactionId(item.id)
																		setCurrentApprovalStatus(
																			statusByIndonesia(
																				item.status as ETransactionApprovalStatus
																			).nextStatus
																		)
																		handleDialog('isConfirmationOpen', true)
																	}}
																>
																	{
																		statusByIndonesia(
																			item.status as ETransactionApprovalStatus
																		).action
																	}
																</AppButton>
															</AppView>
														)}
												</AppView>
											</>
										)}
									</AppView>
									{/* End Description and Other Details */}
								</StyledTransactionCard>
							)}
						/>
					)
				)}
				{/* End Transaction List */}

				{/* Transaction Pay Dialog */}
				<TransactionPayDialog
					isOpen={dialogOptions.isPayOpen}
					transactionId={currentTransactionId}
					onClose={() => {
						setCurrentTransactionId('')

						handleDialog('isPayOpen', false)
					}}
					onConfirm={() => fetchTransactionList()}
				/>
				{/* End Transaction Pay Dialog  */}

				{/* Alert Confirmation for transaction approval */}
				<AppAlertDialog
					isOpen={dialogOptions.isConfirmationOpen}
					title={'Transaction Approval'}
					description={'Are you sure want to process this transaction?'}
					onClose={() => handleDialog('isConfirmationOpen', false)}
					onConfirm={async () => {
						await handleTransaction({
							params: { transactionId: currentTransactionId },
							body: {
								approvalStatus:
									currentApprovalStatus as ETransactionApprovalStatus
							}
						}).unwrap()
						handleDialog('isConfirmationOpen', false)
						fetchTransactionList()
					}}
					isYesLoading={isHandleTransactionLoading}
				/>
				{/* End Alert Confirmation for transaction approval */}

				{/* Transaction Reject Dialog */}
				<TransactionRejectDialog
					isOpen={dialogOptions.isRejectOpen}
					transactionId={currentTransactionId}
					onClose={() => {
						setCurrentTransactionId('')

						handleDialog('isRejectOpen', false)
					}}
					onConfirm={() => fetchTransactionList()}
				/>
				{/* End Transaction Reject Dialog */}
			</AppContainer>
		</AppWrapper>
	)
})

TransactionListScreen.displayName = 'TransactionListScreen'

export { TransactionListScreen }
