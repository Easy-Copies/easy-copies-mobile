// Styled Components
import styled from 'styled-components'

// Components
import { AppView } from '@/features/app/components'

export const StyledWrapper = styled(AppView)`
	background-color: ${props => props.theme.colors.primary};
	height: 200px;
	padding-left: 35px;
	padding-right: 35px;
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
`

export const StyledPhotoProfile = styled(AppView)`
	background-color: ${props => props.theme.colors.gray};
	width: 70px;
	height: 70px;
	border-radius: ${() => 70 / 2}px;
`
