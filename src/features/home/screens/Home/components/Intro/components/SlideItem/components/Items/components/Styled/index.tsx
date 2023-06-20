// Styled Components
import styled from 'styled-components'

// Components
import { AppView } from '@/features/app/components'

// React Native Responsive Screen
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

// Native Base
import { Image } from 'native-base'

export const StyledIntroCard = styled(AppView)`
	background-color: ${props => props.theme.colors.lightBlue};
	width: 100%;
	height: ${() => hp('15%')}px;
	padding: 15px;
	border-radius: 20px;
	align-items: center;
	flex-direction: row;
`

export const StyledIntroCardLogo = styled(AppView)`
	background-color: #fff;
	border-radius: 16px;
	padding: 17px;
	width: 90px;
	height: 90px;
	align-items: center;
	flex-direction: column;
	justify-content: center;
`

export const StyledIntroCardLogoEasyCopies = styled(Image).attrs({
	source: require('@/assets/images/easy-copies-bottom.png'),
	alt: 'home-intro-easy'
})`
	width: 53px;
	height: 36px;
`
