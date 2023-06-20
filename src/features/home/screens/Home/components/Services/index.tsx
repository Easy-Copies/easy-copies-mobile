// React
import { memo, useMemo } from 'react'

// Components
import { AppText } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'
import { StyledImage, StyledServiceCard } from './components/Styled'

// Native Base
import { FlatList, Row } from 'native-base'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Types
import { THomeScreenProps } from '@/features/home/screens/Home/types'

// Constants
import {
	E_APP_STACK_NAVIGATION,
	E_STORE_STACK_NAVIGATION
} from '@/features/app/constants'

const HomeServices = memo(() => {
	// Translator
	const { t } = useTranslation()

	// Navigation
	const navigation = useNavigation<THomeScreenProps['navigation']>()

	// Common State
	const services = useMemo((): {
		id: number
		text: string
		image: any
		imageStyle: { width: number; height: number }
	}[] => {
		return [
			{
				id: 1,
				text: t('app.services.printing'),
				image: require('@/assets/images/printing.png'),
				imageStyle: { width: 60, height: 60 }
			},
			{
				id: 2,
				text: t('app.services.binding'),
				image: require('@/assets/images/binding.png'),
				imageStyle: { width: 90, height: 60 }
			},
			{
				id: 3,
				text: t('app.services.fotocopy'),
				image: require('@/assets/images/fotocopy.png'),
				imageStyle: { width: 60, height: 60 }
			},
			{
				id: 4,
				text: t('app.services.laminating'),
				image: require('@/assets/images/laminating.png'),
				imageStyle: { width: 90.6, height: 60 }
			}
		]
	}, [t])

	return (
		<>
			<AppText
				fontSize={20}
				fontWeight={'700'}
				color={'primary.400'}
				lineHeight={25}
				marginBottom={2}
			>
				{t('app.services.services')}
			</AppText>

			<Row space={1}>
				<FlatList
					columnWrapperStyle={{
						justifyContent: 'space-between',
						marginBottom: 20
					}}
					flex={1}
					numColumns={2}
					data={services}
					keyExtractor={item => item.id.toString()}
					scrollEnabled={false}
					renderItem={({ item }) => (
						<StyledServiceCard
							justifyContent={'center'}
							width={'48%'}
							onPress={() =>
								navigation.navigate(E_APP_STACK_NAVIGATION.STORE, {
									screen: E_STORE_STACK_NAVIGATION.STORE_LIST
								})
							}
						>
							<StyledImage
								source={item.image}
								{...item.imageStyle}
								marginBottom={1}
								alt={item.text}
							/>
							<AppText
								fontSize={14}
								color={'white'}
								fontWeight={'700'}
								lineHeight={17.5}
							>
								{item.text}
							</AppText>
						</StyledServiceCard>
					)}
				/>
			</Row>
		</>
	)
})

HomeServices.displayName = 'HomeServices'

export { HomeServices }
