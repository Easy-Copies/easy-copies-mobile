// React
import { memo } from 'react'

// Native Base
import { Row, Column, Alert } from 'native-base'

// Types
import { TAppToastProps } from './types'

// Components
import { AppText } from '@/features/app/components/Text'

const AppToast = memo(
	({ status, variant, title, description }: TAppToastProps) => {
		return (
			<Alert
				maxWidth='100%'
				alignSelf='center'
				flexDirection='row'
				status={status ? status : 'info'}
				variant={variant}
				marginX={20}
			>
				<Column space={1} flexShrink={1} w='100%'>
					<Row
						flexShrink={1}
						alignItems='center'
						justifyContent='space-between'
					>
						<Row space={2} flexShrink={1} alignItems='center'>
							<Alert.Icon />
							<AppText
								fontSize={12}
								fontWeight='medium'
								flexShrink={1}
								color={
									variant === 'solid'
										? 'lightText'
										: variant !== 'outline'
										? 'darkText'
										: null
								}
							>
								{title}
							</AppText>
						</Row>
					</Row>
					<AppText
						px='6'
						fontSize={12}
						color={
							variant === 'solid'
								? 'lightText'
								: variant !== 'outline'
								? 'darkText'
								: null
						}
					>
						{description}
					</AppText>
				</Column>
			</Alert>
		)
	}
)

AppToast.displayName = 'AppToast'

export { AppToast }
