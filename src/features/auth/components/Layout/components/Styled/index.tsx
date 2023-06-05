// Styled Components
import styled from 'styled-components'

// React Native
import { Image, View } from 'react-native'

export const StyledBody = styled(View)`
	padding-left: 35px;
	padding-right: 35px;
`

export const StyledEasyCopiesImage = styled(Image).attrs({
	source: require('@/assets/images/easy-copies.png')
})`
	width: 180px;
	height: 56px;
`
