// Styled Components
import styled from 'styled-components'

// React Native
import { View, Image } from 'react-native'

export const StyledCentered = styled(View)`
	height: 92%;
	width: 100%;
	display: flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-items: center;
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

export const StyledBottomWrapper = styled(View)`
	padding-left: 27px;
	padding-right: 27px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	margin-bottom: 20px;
`
