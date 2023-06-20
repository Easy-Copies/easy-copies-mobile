// Styled Components
import styled from 'styled-components'

// Native Base
import { Image, Pressable } from 'native-base'

export const StyledStoreCard = styled(Pressable)`
	background-color: #fff;
	height: 100px;
	border-radius: 6px;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
	padding: 10px;
`

export const StyledStorePhoto = styled(Image)`
	object-fit: cover;
	background-color: ${props => props.theme.colors.gray};
	width: 80px;
	height: 80px;
	border-radius: 8px;
`
