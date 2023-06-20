// Styled Components
import styled from 'styled-components'

// React Native
import { View, Image } from 'react-native'

export const StyledCentered = styled(View)`
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-items: center;
	padding-left: 55px;
	padding-right: 55px;
`

export const StyledFooter = styled(View)`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-align: center;
`

export const StyledImage = styled(Image).attrs({
	source: require('@/assets/images/easy-copies.png')
})`
	width: 180px;
	height: 56px;
`
