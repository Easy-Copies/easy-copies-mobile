// React
import { memo, useEffect, useState } from 'react'

// Components
import {
	AppButton,
	AppContainer,
	AppText,
	AppView,
	AppWrapper
} from '@/features/app/components'
import {
	StyledStorePhoto,
	StyledStoreServiceCard,
	StyledStickyBottom,
	StyledStoreStar
} from './components'

// Redux
import { useLazyStore_showQuery } from '@/features/store/redux'
import { useLazyStoreService_indexQuery } from '@/features/store/children/store-service/redux'

// Types
import { TStoreDetailScreenProps } from './types'

// Native Base
import { ScrollView, Divider, CheckIcon } from 'native-base'
import {
	E_APP_BOTTOM_TAB_NAVIGATION,
	E_APP_STACK_NAVIGATION,
	E_STORE_STACK_NAVIGATION,
	E_TRANSACTION_STACK_NAVIGATION
} from '@/features/app/constants'

// Constants
import { EStoreServiceName } from '@/features/store/children/store-service/types/store-service.type'

const StoreDetailScreen = memo(
	({ route, navigation }: TStoreDetailScreenProps) => {
		// Common State
		const [selectedStoreService, setSelectedStoreService] = useState<{
			storePricePerSheet: number
			storeServiceName: EStoreServiceName
		} | null>(null)

		// RTK
		const [
			getStoreDetail,
			{ data: storeDetail, isLoading: isStoreDetailLoading }
		] = useLazyStore_showQuery()
		const [
			getStoreServiceList,
			{ data: storeServiceList, isLoading: isStoreServiceLoading }
		] = useLazyStoreService_indexQuery()

		// Do when user came firs to this component
		useEffect(() => {
			getStoreDetail({ params: { id: route.params.id } }, false)
			getStoreServiceList({ params: { storeId: route.params.id } }, false)
		}, [getStoreDetail, getStoreServiceList, route.params.id])

		return (
			<AppWrapper>
				<ScrollView flex={1}>
					{isStoreDetailLoading ? (
						<AppText>Loading...</AppText>
					) : storeDetail?.result ? (
						<>
							<StyledStorePhoto
								source={{
									uri: storeDetail.result.storePhoto
								}}
								alt={'Store'}
							/>
							{/* Store Info */}
							<AppContainer marginTop={'2px'} withoutHeight>
								<AppView marginBottom={'10px'}>
									<AppView
										flexDirection={'row'}
										alignItems={'center'}
										justifyContent={'space-between'}
									>
										<AppText
											fontWeight={'600'}
											lineHeight={25}
											fontSize={20}
											marginBottom={0.5}
										>
											{storeDetail.result.name}
										</AppText>

										<AppView flexDirection={'row'} alignItems={'center'}>
											<StyledStoreStar />
											<AppText
												fontWeight={'600'}
												lineHeight={25}
												marginBottom={0.5}
											>
												4.8
											</AppText>
										</AppView>
									</AppView>
									<AppText fontWeight={'400'} lineHeight={15} fontSize={12}>
										{storeDetail.result.province?.name},{' '}
										{storeDetail.result.regency?.name}
									</AppText>
								</AppView>
								<AppView marginBottom={'10px'}>
									<AppText fontSize={12} lineHeight={15} fontWeight={'400'}>
										{storeDetail.result.description}
									</AppText>
								</AppView>
								<AppText fontSize={12} lineHeight={15} fontWeight={'400'}>
									Address: {storeDetail.result.address}
								</AppText>
							</AppContainer>
							{/* End Store Info */}

							<Divider
								backgroundColor={'lightGray.400'}
								marginTop={'15px'}
								marginBottom={'15px'}
							/>

							{/* Services */}
							{!isStoreServiceLoading && (
								<AppContainer
									withoutHeight
									marginBottom={selectedStoreService ? '50px' : undefined}
								>
									<AppView marginBottom={'10px'}>
										<AppText
											fontWeight={'600'}
											lineHeight={25}
											fontSize={20}
											marginBottom={'20px'}
										>
											Layanan
										</AppText>

										{storeServiceList?.result?.rows?.map(row => (
											<StyledStoreServiceCard
												key={row.id}
												marginBottom={'10px'}
												onPress={() =>
													setSelectedStoreService(previousStoreService =>
														previousStoreService?.storeServiceName === row.name
															? null
															: {
																	storeServiceName: row.name,
																	storePricePerSheet: row.pricePerSheet
															  }
													)
												}
											>
												<AppView
													flexDirection={'row'}
													alignItems={'center'}
													justifyContent={'space-between'}
												>
													<AppText fontWeight={'600'} lineHeight={25}>
														{row.name}
													</AppText>

													{selectedStoreService?.storeServiceName ===
														row.name && (
														<CheckIcon size='5' mt='0.5' color='emerald.500' />
													)}
												</AppView>

												<AppText fontWeight={'400'} fontSize={12}>
													Rp.{row.pricePerSheet} / Lembar
												</AppText>
											</StyledStoreServiceCard>
										))}
									</AppView>
								</AppContainer>
							)}
							{/* End Services */}
						</>
					) : (
						<AppText>Something went wrong!</AppText>
					)}
				</ScrollView>

				{/* Sticky Bottom Bar */}
				{selectedStoreService && (
					<StyledStickyBottom>
						<AppView
							flexDirection={'row'}
							alignItems={'flex-end'}
							justifyContent={'flex-end'}
							textAlign={'right'}
							width={'100%'}
						>
							<AppButton
								width={'100px'}
								height={'40px'}
								backgroundColor={'primary.400'}
								_text={{ textTransform: 'none' }}
								onPress={() =>
									navigation.push(E_APP_STACK_NAVIGATION.APP, {
										screen: E_APP_BOTTOM_TAB_NAVIGATION.TRANSACTION,
										params: {
											screen: E_TRANSACTION_STACK_NAVIGATION.TRANSACTION_CREATE,
											params: {
												storeId: route.params.id,
												storeService:
													selectedStoreService.storeServiceName as EStoreServiceName,
												storePricePerSheet:
													selectedStoreService.storePricePerSheet,
												from: E_STORE_STACK_NAVIGATION.STORE_DETAIL
											}
										}
									})
								}
							>
								Lanjut
							</AppButton>
						</AppView>
					</StyledStickyBottom>
				)}
			</AppWrapper>
		)
	}
)

StoreDetailScreen.displayName = 'StoreDetailScreen'

export { StoreDetailScreen }
