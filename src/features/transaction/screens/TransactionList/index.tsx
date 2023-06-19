// React
import { memo, useCallback, useEffect, useState } from 'react'

import { Platform } from 'react-native'

// Components
import {
	AppContainer,
	AppText,
	AppView,
	AppWrapper,
	AppButton
} from '@/features/app/components'
import {
	StyledTransactionCard,
	StyledTransactionStatus,
	TransactionPayDialog
} from './components'

// Native Base
import { Divider, FlatList, ScrollView } from 'native-base'

// Types
import { ETransactionApprovalStatus } from '@/features/transaction/types'

// Redux
import { useLazyTransaction_indexQuery } from '@/features/transaction/redux'

const TransactionListScreen = memo(() => {
	// Common State
	const [currentTransactionStatus, setCurrentTransactionStatus] = useState<
		ETransactionApprovalStatus | undefined
	>(undefined)
	const [currentTransactionId, setCurrentTransactionId] = useState<string>('')
	const [dialogOptions, setDialogOptions] = useState<{
		isPayOpen: boolean
	}>({ isPayOpen: false })

	// RTK
	const [
		getTransactionList,
		{
			data: transactionList,
			isLoading: isTransactionListLoading,
			isFetching: isTransactionListFetching
		}
	] = useLazyTransaction_indexQuery()

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
										{transactionStatus}
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
										<AppText fontSize={10}>{item.status}</AppText>
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

											{item.status ===
												ETransactionApprovalStatus.WaitingPayment && (
												<AppView>
													<AppButton
														backgroundColor={'primary.400'}
														width={'150px'}
														height={'30px'}
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
										</AppView>
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
			</AppContainer>
		</AppWrapper>
	)
})

TransactionListScreen.displayName = 'TransactionListScreen'

export { TransactionListScreen }
