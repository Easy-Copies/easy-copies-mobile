// React
import { memo, useRef } from 'react'

// Native Base
import { AlertDialog, Center, Button } from 'native-base'

// Components
import { AppButton } from '@/features/app/components/Button'

// Types
import { TAppAlertDialogProps } from './types'

const AppAlertDialog = memo(
	({
		isOpen,
		title,
		description,
		cancelTitle,
		yesTitle,
		onClose,
		onConfirm
	}: TAppAlertDialogProps) => {
		const ref = useRef(null)

		return (
			<Center>
				<AlertDialog
					isOpen={isOpen}
					onClose={onClose}
					leastDestructiveRef={ref}
				>
					<AlertDialog.Content>
						<AlertDialog.CloseButton />
						<AlertDialog.Header>{title}</AlertDialog.Header>
						<AlertDialog.Body>{description}</AlertDialog.Body>
						<AlertDialog.Footer>
							<Button.Group space={2}>
								<AppButton
									variant='unstyled'
									colorScheme='coolGray'
									onPress={onClose}
								>
									{cancelTitle || 'Cancel'}
								</AppButton>
								<AppButton onPress={onConfirm} backgroundColor={'primary.400'}>
									{yesTitle || 'Yes'}
								</AppButton>
							</Button.Group>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog>
			</Center>
		)
	}
)

AppAlertDialog.displayName = 'AppAlertDialog'

export { AppAlertDialog }
