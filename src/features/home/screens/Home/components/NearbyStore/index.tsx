// React
import { memo, useEffect } from 'react'

// Components
import { AppText, AppView } from '@/features/app/components'
import { StyledStoreCard, StyledStorePhoto } from './components'

// i18n
import { useTranslation } from 'react-i18next'

// Native Base
import { ScrollView } from 'native-base'

// Redux
import { useLazyStore_indexQuery } from '@/features/store/redux'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { THomeProps } from '@/features/home/screens/Home/types'

// Constants
import {
	E_APP_STACK_NAVIGATION,
	E_STORE_STACK_NAVIGATION
} from '@/features/app/constants'

const HomeNearbyStore = memo(() => {
	// i18n
	const { t } = useTranslation()

	// RTK
	const [getStoreList, { data: storeList }] = useLazyStore_indexQuery()

	// Navigation
	const navigation = useNavigation<THomeProps['navigation']>()

	// Do when first came to this component
	useEffect(() => {
		getStoreList()
	}, [getStoreList])

	return (
		<AppView marginTop={'30px'} marginBottom={'30px'}>
			{/* Title */}
			<AppView
				flexDirection={'row'}
				alignItems={'center'}
				justifyContent={'space-between'}
				marginBottom={'10px'}
			>
				<AppText
					fontSize={20}
					fontWeight={'700'}
					color={'primary.400'}
					lineHeight={25}
				>
					{t('home.recommendedStore')}
				</AppText>

				<AppText
					fontSize={12}
					fontWeight={'500'}
					color={'primary.400'}
					lineHeight={15}
					onPress={() =>
						navigation.navigate(E_APP_STACK_NAVIGATION.STORE, {
							screen: E_STORE_STACK_NAVIGATION.STORE_LIST
						})
					}
				>
					{t('app.more')}
				</AppText>
			</AppView>
			{/* End Title */}

			{/* Store List */}
			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				{storeList?.result?.rows?.map(row => (
					<StyledStoreCard marginRight={'15px'} key={row.id}>
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
									{row.name}
								</AppText>
								<AppText
									fontSize={8}
									lineHeight={15}
									fontWeight={'500'}
									color={'primary.400'}
								>
									{row.address}
								</AppText>
							</AppView>
						</AppView>
					</StyledStoreCard>
				))}
			</ScrollView>
			{/* End Store List */}
		</AppView>
	)
})

HomeNearbyStore.displayName = 'HomeNearbyStore'

export { HomeNearbyStore }
