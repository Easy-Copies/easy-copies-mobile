// Styled Components
import styled from 'styled-components'

// Native Base
import { Image, IImageProps } from 'native-base'

// Image Custom Props
interface IImagePropsCustom extends IImageProps {
	isActive: boolean
}

export const StyledHomeImage = styled((props: IImagePropsCustom) => (
	<Image {...props} />
)).attrs(props => ({
	source: props.isActive
		? require('@/assets/images/home-active.png')
		: require('@/assets/images/home.png'),
	alt: `home-${props.isActive ? 'active' : 'inactive'}`
}))`
	width: 40px;
	height: 40px;
`

export const StyledHistoryImage = styled((props: IImagePropsCustom) => (
	<Image {...props} />
)).attrs(props => ({
	source: props.isActive
		? require('@/assets/images/history-active.png')
		: require('@/assets/images/history.png'),
	alt: `history-${props.isActive ? 'active' : 'inactive'}`
}))`
	width: 40px;
	height: 40px;
`
