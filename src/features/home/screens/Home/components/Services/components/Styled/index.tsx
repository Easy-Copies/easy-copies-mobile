// Styled Components
import styled from 'styled-components'

// Native Base
import { Pressable, Image } from 'native-base'

export const StyledServiceCard = styled(Pressable)`
	background-color: ${props => props.theme.colors.blue};
	height: 100px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`

export const StyledImage = styled(Image)``
