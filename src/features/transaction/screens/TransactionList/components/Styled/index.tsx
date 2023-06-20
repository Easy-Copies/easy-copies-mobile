// React
import { ComponentProps } from 'react'

// Styled Components
import styled from 'styled-components'

// Native Base
import { Pressable } from 'native-base'

export const StyledTransactionStatus = styled(
	(props: { isActive: boolean } & ComponentProps<typeof Pressable>) => (
		<Pressable {...props} />
	)
)`
	min-width: 88px;
	border-radius: 20px;
	padding: 7px 20px;
	border-color: ${props => props.theme.colors.trueGray};
	border-width: 1px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${props =>
		props.isActive ? props.theme.colors.blueSky : '#fff'};
`

export const StyledTransactionCard = styled(Pressable)`
	width: 100%;
	background: #ffffff;
	box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	border-width: 1px;
	padding: 17px 27px;
`
