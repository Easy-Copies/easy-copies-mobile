// Styled Components
import styled from 'styled-components'

// Native Base
import { Image } from 'native-base'

export const StyledDatePickerImage = styled(Image).attrs({
	source: require('@/assets/images/date-picker.png'),
	alt: 'date-time-picker'
})`
	width: 20px;
	height: 20px;
	margin-right: 8px;
`
