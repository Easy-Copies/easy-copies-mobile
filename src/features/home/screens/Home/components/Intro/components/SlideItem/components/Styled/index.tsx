// Styled Components
import styled from 'styled-components'

// Native Base
import { Image } from 'native-base'

export const StyledImage = styled(Image).attrs({
	source: require('@/assets/images/easy-copies.png')
})`
	width: 180px;
	height: 56px;
`
