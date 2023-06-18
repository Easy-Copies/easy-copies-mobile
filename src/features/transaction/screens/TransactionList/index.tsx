// React
import { memo, useCallback, useEffect, useState } from 'react'

// Components
import {
	AppContainer,
	AppText,
	AppView,
	AppWrapper
} from '@/features/app/components'
import { StyledTransactionCard, StyledTransactionStatus } from './components'

// Native Base
import { Divider, FlatList, ScrollView } from 'native-base'

// Types
import { ETransactionApprovalStatus } from '@/features/transaction/types'

// Redux
import { useLazyTransaction_indexQuery } from '@/features/transaction/redux'

const TransactionListScreen = memo(() => {
	// Common Status
	const [currentTransactionStatus, setCurrentTransactionStatus] = useState<
		ETransactionApprovalStatus | undefined
	>(undefined)

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
							data={transactionList.result?.rows}
							keyExtractor={item => item.id}
							refreshing={isTransactionListFetching}
							onRefresh={() => fetchTransactionList()}
							renderItem={({ item }) => (
								<StyledTransactionCard marginBottom={'20px'}>
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

										<AppText fontSize={9} marginTop={'10px'}>
											Harga
										</AppText>
										<AppText fontSize={12} fontWeight={'700'} lineHeight={15}>
											Rp. {item.totalPrice}
										</AppText>
									</AppView>
									{/* End Description and Other Details */}
								</StyledTransactionCard>
							)}
						/>
					)
				)}
				{/* End Transaction List */}
			</AppContainer>
		</AppWrapper>
	)
})

TransactionListScreen.displayName = 'TransactionListScreen'

export { TransactionListScreen }
