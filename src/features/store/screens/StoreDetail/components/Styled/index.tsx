// Styled Components
import styled from 'styled-components'

// Native Base
import { Image, Pressable } from 'native-base'

// Components
import { AppView } from '@/features/app/components'

export const StyledStorePhoto = styled(Image)`
	width: 100%;
	height: 250px;
`

export const StyledStoreServiceCard = styled(Pressable)`
	width: 100%;
	height: 76px;
	border-radius: 6px;
	padding: 10px;
	box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
	border-color: ${props => props.theme.colors.lightGray};
	border-width: 1px;
`

export const StyledStickyBottom = styled(AppView)`
	width: 100%;
	height: 70px;
	box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.25);
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 10px;
	padding-left: 20px;
	padding-right: 20px;
`
