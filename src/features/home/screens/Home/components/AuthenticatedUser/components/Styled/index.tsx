// Styled Components
import styled from 'styled-components'

// Components
import { AppView } from '@/features/app/components'

// React Native
import { Dimensions } from 'react-native'
import { Image } from 'native-base'

export const StyledWrapper = styled(AppView)`
	background-color: ${props => props.theme.colors.primary};
	height: ${() => Dimensions.get('screen').width / 3.3}px;
	padding-left: 35px;
	padding-right: 35px;
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
`

export const StyledPhotoProfile = styled(Image).attrs({
	source: { uri: 'https://randomuser.me/api/portraits/women/33.jpg' },
	alt: 'random-user'
})`
	object-fit: cover;
	background-color: ${props => props.theme.colors.gray};
	width: 70px;
	height: 70px;
	border-radius: ${() => 70 / 2}px;
	border-color: white;
	border-width: 1px;
`
