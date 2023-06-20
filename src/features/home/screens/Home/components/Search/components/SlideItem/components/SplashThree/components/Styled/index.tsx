// Styled Components
import styled from 'styled-components'

// React Native
import { Image } from 'react-native'

export const StyledImage = styled(Image).attrs({
	source: require('@/assets/images/splash-3.png')
})`
	width: 309px;
	height: 206px;
`
