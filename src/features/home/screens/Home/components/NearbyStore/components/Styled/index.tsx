// Styled Components
import styled from 'styled-components'

// Native Base
import { Image, Pressable } from 'native-base'

export const StyledStoreCard = styled(Pressable)`
	background-color: ${props => props.theme.colors.lightBlue};
	height: 80px;
	border-radius: 10px;
	width: 209px;
	padding: 10px;
`

export const StyledStorePhoto = styled(Image)`
	object-fit: cover;
	background-color: ${props => props.theme.colors.gray};
	width: 60px;
	height: 60px;
	border-radius: 8px;
`
