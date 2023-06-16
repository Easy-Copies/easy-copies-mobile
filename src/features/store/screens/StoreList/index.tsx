// React
import { memo, useEffect } from 'react'

// Components
import {
	AppContainer,
	AppText,
	AppView,
	AppWrapper
} from '@/features/app/components'
import { StyledStoreCard, StyledStorePhoto } from './components'

// Native Base
import { FlatList } from 'native-base'

// Redux
import { useLazyStore_indexQuery } from '@/features/store/redux'

const StoreListScreen = memo(() => {
	// RTK
	const [getStoreList, { data: storeList }] = useLazyStore_indexQuery()

	// Do when user came to this component
	useEffect(() => {
		getStoreList()
	}, [getStoreList])

	return (
		<AppWrapper>
			<AppContainer>
				<FlatList
					flex={1}
					data={storeList?.result?.rows || []}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<StyledStoreCard marginTop={'10px'} marginBottom={'10px'}>
							<AppView
								flexDirection={'row'}
								justifyContent={'center'}
								alignItems={'center'}
							>
								<StyledStorePhoto />

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
									>
										{item.address}
									</AppText>
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
