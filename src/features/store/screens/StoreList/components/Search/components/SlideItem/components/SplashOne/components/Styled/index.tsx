// Styled Components
import styled from 'styled-components'

// React Native
import { Image } from 'react-native'

export const StyledImageOne = styled(Image).attrs({
	source: require('@/assets/images/easy-copies.png')
})`
	width: 180px;
	height: 56px;
`

export const StyledImageTwo = styled(Image).attrs({
	source: require('@/assets/images/splash-1.png')
})`
	width: 227px;
	height: 227px;
`
