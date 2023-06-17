// Styled Components
import styled from 'styled-components'

// Components
import { AppView } from '@/features/app/components'

export const StyledStickyBottom = styled(AppView)`
	width: 100%;
	height: 90px;
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
