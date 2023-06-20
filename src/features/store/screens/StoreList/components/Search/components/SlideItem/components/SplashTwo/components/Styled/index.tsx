// Styled Components
import styled from 'styled-components'

// React Native
import { Image } from 'react-native'

export const StyledImage = styled(Image).attrs({
	source: require('@/assets/images/splash-2.png')
})`
	width: 240px;
	height: 240px;
`
