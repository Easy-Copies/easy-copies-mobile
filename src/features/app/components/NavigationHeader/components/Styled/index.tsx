// Styled Components
import styled from 'styled-components'

// Components
import { AppView } from '@/features/app/components/View'

// Native Base
import { Image } from 'native-base'

// React Native Responsive
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

// React Native
import { Platform } from 'react-native'

export const StyledWrapper = styled(AppView)`
	background-color: ${props => props.theme.colors.primary};
	font-size: 20px;
	font-weight: 600;
	line-height: 25px;
	color: #fff;
	height: ${() => (Platform.OS === 'android' ? hp('7%') : hp('12%'))};
	padding-top: ${() => (Platform.OS === 'android' ? '12px' : '20px')};
`

export const StyledImageBackButton = styled(Image).attrs({
	source: require('@/assets/images/header-back.png')
})`
	width: 30px;
	height: 30px;
`
