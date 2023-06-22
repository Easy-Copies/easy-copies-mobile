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
import { THomeScreenProps } from '@/features/home/screens/Home/types'

// Constants
import {
	E_APP_STACK_NAVIGATION,
	E_STORE_STACK_NAVIGATION
} from '@/features/app/constants'

// React Native Responsive Screen
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const HomeNearbyStore = memo(() => {
	// i18n
	const { t } = useTranslation()

	// RTK
	const [getStoreList, { data: storeList }] = useLazyStore_indexQuery()

	// Navigation
	const navigation = useNavigation<THomeScreenProps['navigation']>()

	// Do when first came to this component
	useEffect(() => {
		getStoreList()
	}, [getStoreList])

	return (
		<AppView marginBottom={'30px'}>
			{/* Title */}
			<AppView
				flexDirection={'row'}
				alignItems={'center'}
				justifyContent={'space-between'}
				marginBottom={'20px'}
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
				{storeList?.result?.rows?.map((row, index) => (
					<StyledStoreCard
						marginRight={
							storeList?.result?.rows?.length - 1 === index ? undefined : '15px'
						}
						key={row.id}
						onPress={() =>
							navigation.navigate(E_APP_STACK_NAVIGATION.STORE, {
								screen: E_STORE_STACK_NAVIGATION.STORE_DETAIL,
								params: {
									id: row.id,
									name: row.name
								}
							})
						}
						height={hp('10%')}
					>
						<AppView
							flexDirection={'row'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<StyledStorePhoto
								alt={row.name}
								source={{ uri: row.storePhoto }}
							/>

							<AppView flex={1} marginLeft={10}>
								<AppText
									fontSize={12}
									lineHeight={15}
									fontWeight={'700'}
									color={'primary.400'}
									marginBottom={'2px'}
									numberOfLines={1}
								>
									{row.name}
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
									{row.address}
								</AppText>
								<AppText fontSize={8} lineHeight={15} fontWeight={'500'}>
									<AppText color={row.isOpen ? 'green.400' : 'red.400'}>
										{row.isOpen ? 'Buka' : 'Tutup'}
									</AppText>
									<AppText> | </AppText>
									<AppText>06:00 - 18:00</AppText>
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
