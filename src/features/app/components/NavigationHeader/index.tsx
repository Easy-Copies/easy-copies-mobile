// React
import { memo } from 'react'

// React Native
import { SafeAreaView } from 'react-native'

// Components
import { StyledImageBackButton, StyledWrapper } from './components'
import { AppText } from '@/features/app/components/Text'
import { AppView } from '@/features/app/components/View'

// Native Base
import { Pressable } from 'native-base'

// Types
import { TAppNavigationHeader } from './types'

const AppNavigationHeader = memo(
	({ title, navigation }: TAppNavigationHeader) => {
		return (
			<StyledWrapper>
				<SafeAreaView>
					<AppView
						paddingLeft={20}
						paddingRight={20}
						alignItems={'center'}
						flexDirection={'row'}
						justifyContent={'space-between'}
					>
						{/* Left Side */}
						{navigation.canGoBack() && (
							<Pressable onPress={() => navigation.pop()}>
								<StyledImageBackButton alt={'back'} />
							</Pressable>
						)}

						{/* Title */}
						<AppView
							flexDirection={'row'}
							textAlign={'center'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<AppText
								fontWeight={'600'}
								fontSize={20}
								lineHeight={25}
								color={'white'}
							>
								{title}
							</AppText>
						</AppView>

						{/* Title */}
						<AppView>
							<AppText color={'primary.400'}>Empty</AppText>
						</AppView>
					</AppView>
				</SafeAreaView>
			</StyledWrapper>
		)
	}
)

AppNavigationHeader.displayName = 'AppNavigationHeader'

export { AppNavigationHeader }
