// React
import { memo, useCallback, useEffect } from 'react'

// Components
import {
	AppContainer,
	AppText,
	AppView,
	AppWrapper
} from '@/features/app/components'
import {
	StyledStoreCard,
	StyledStorePhoto,
	StyledStoreStar
} from './components'

// Native Base
import { FlatList } from 'native-base'

// Redux
import { useLazyStore_indexQuery } from '@/features/store/redux'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { TStoreListScreenProps } from '@/features/store/screens/StoreList/types'

// Constants
import { E_STORE_STACK_NAVIGATION } from '@/features/app/constants'
import { StoreSearch } from './components/Search'

const StoreListScreen = memo(() => {
	// RTK
	const [getStoreList, { data: storeList }] = useLazyStore_indexQuery()

	// Navigation
	const navigation = useNavigation<TStoreListScreenProps['navigation']>()

	/**
	 * @description Fetch store list
	 *
	 * @return {Promise<void>} Promise<void>
	 */
	const fetchStoreList = useCallback(async (): Promise<void> => {
		try {
			await getStoreList({}, false).unwrap()
		} catch (_) {
			//
		}
	}, [getStoreList])

	// Do when user came to this component
	useEffect(() => {
		fetchStoreList()
	}, [fetchStoreList])

	return (
		<AppWrapper>
			<AppContainer>
				<StoreSearch />

				<FlatList
					flex={1}
					data={storeList?.result?.rows || []}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<StyledStoreCard
							marginTop={'10px'}
							marginBottom={'10px'}
							onPress={() =>
								navigation.navigate(E_STORE_STACK_NAVIGATION.STORE_DETAIL, {
									id: item.id,
									name: item.name
								})
							}
						>
							<AppView
								flexDirection={'row'}
								justifyContent={'center'}
								alignItems={'center'}
							>
								<StyledStorePhoto
									alt={item.name}
									source={{ uri: item.storePhoto }}
								/>

								<AppView flex={1} marginLeft={10}>
									<AppText
										fontSize={12}
										lineHeight={15}
										fontWeight={'700'}
										color={'primary.400'}
										marginBottom={'2px'}
									>
										{item.name}
									</AppText>
									<AppText
										fontSize={8}
										lineHeight={15}
										fontWeight={'500'}
										color={'primary.400'}
										numberOfLines={2}
										marginTop={'2px'}
										marginBottom={'2px'}
									>
										{item.address}
									</AppText>
									<AppView
										alignItems={'center'}
										justifyContent={'space-between'}
										flexDirection={'row'}
									>
										<AppView>
											<AppText fontSize={8} lineHeight={15} fontWeight={'500'}>
												<AppText color={item.isOpen ? 'green.400' : 'red.400'}>
													{item.isOpen ? 'Buka' : 'Tutup'}
												</AppText>
												<AppText> | </AppText>
												<AppText>06:00 - 18:00</AppText>
											</AppText>
										</AppView>

										<AppView flexDirection={'row'} alignItems={'center'}>
											<StyledStoreStar />
											<AppText fontSize={8} marginLeft={1}>
												4.8
											</AppText>
										</AppView>
									</AppView>
								</AppView>
							</AppView>
						</StyledStoreCard>
					)}
				/>
			</AppContainer>
		</AppWrapper>
	)
})

StoreListScreen.displayName = 'StoreListScreen'

export { StoreListScreen }
