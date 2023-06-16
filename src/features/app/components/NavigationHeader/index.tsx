// React
import { memo } from 'react'

// React Native
import { SafeAreaView } from 'react-native'

// Components
import { StyledImageBackButton, StyledWrapper } from './components'
import { AppText } from '@/features/app/components/Text'
import { AppView } from '@/features/app/components/View'

// Native Base
import { useTheme, Pressable } from 'native-base'

// Types
import { TAppNavigationHeader } from './types'

const AppNavigationHeader = memo(
	({ isFromSomeWhere, title, navigation }: TAppNavigationHeader) => {
		// Native Base Theme
		const themeNativeBase = useTheme()

		return (
			<AppView
				style={{
					backgroundColor: themeNativeBase.colors.primary['400'],
					width: '100%',
					height: 105
				}}
			>
				<StyledWrapper>
					<SafeAreaView>
						<AppView
							paddingLeft={20}
							paddingRight={20}
							alignItems={'center'}
							flexDirection={'row'}
							width={'100%'}
						>
							{/* Back Button */}
							{isFromSomeWhere && (
								<Pressable onPress={() => navigation.goBack()}>
									<StyledImageBackButton alt={'back'} />
								</Pressable>
							)}

							{/* Title */}
							<AppView
								flexDirection={'row'}
								textAlign={'center'}
								justifyContent={'center'}
								alignItems={'center'}
								width={isFromSomeWhere ? '84.6%' : '100%'}
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
						</AppView>
					</SafeAreaView>
				</StyledWrapper>
			</AppView>
		)
	}
)

AppNavigationHeader.displayName = 'AppNavigationHeader'

export { AppNavigationHeader }
