// React
import { memo, useCallback } from 'react'

// Interfaces
import { IAppSelectProps } from './types'

// Native Base
import { FormControl, WarningOutlineIcon } from 'native-base'

// Components
import { StyledWrapper } from './components'
import { AppButton } from '@/features/app/components/Button'
import { AppView } from '@/features/app/components/View'
import { AppText } from '@/features/app/components/Text'

// i18n
import { useTranslation } from 'react-i18next'

// React Native Document Picker
import DocumentPicker from 'react-native-document-picker'

// React Native File System
import FileSystem from 'react-native-fs'

// Types
import { TAppFile } from '@/features/app/types'

const AppFileUpload = memo(
	({
		inputLabel,
		file,
		files,
		onChangeFile,
		onChangeFiles,
		isMultiple,
		error
	}: IAppSelectProps) => {
		// Translation
		const { t } = useTranslation()

		/**
		 * @description Pick some file from storage
		 *
		 * @return {void} void
		 */
		const onPickFile = useCallback(async () => {
			try {
				if (isMultiple && onChangeFiles) {
					const selectedFiles = await DocumentPicker.pick({
						allowMultiSelection: true
					})

					const selectedFilesBase64: typeof files = []

					for (const selectedFile of selectedFiles) {
						selectedFilesBase64.push({
							format: selectedFile.type?.split('/')?.[1] as string,
							name: selectedFile.name?.split('.')?.[0] as string,
							file: await FileSystem.readFile(selectedFile.uri, 'base64'),
							size: selectedFile.size as number
						})
					}
					onChangeFiles(selectedFilesBase64)
				}

				if (!isMultiple && onChangeFile) {
					const selectedFile = await DocumentPicker.pickSingle()
					const mapFile: TAppFile = {
						format: selectedFile.type?.split('/')?.[1] as string,
						name: selectedFile.name?.split('.')?.[0] as string,
						file: await FileSystem.readFile(selectedFile.uri, 'base64'),
						size: selectedFile.size as number
					}

					onChangeFile(mapFile)
				}
			} catch (_) {
				//
			}
		}, [onChangeFile, onChangeFiles, isMultiple])

		return (
			<FormControl isInvalid={Boolean(error)} marginBottom={2.5} isReadOnly>
				{inputLabel && (
					<FormControl.Label
						marginBottom={2}
						_text={{
							fontSize: 14,
							fontWeight: 700,
							lineHeight: 20,
							color: 'primary.400'
						}}
					>
						{t(inputLabel)}
					</FormControl.Label>
				)}

				<StyledWrapper marginBottom={'10px'}>
					<AppButton
						onPress={onPickFile}
						variant={'outline'}
						_text={{
							color: 'primary.400'
						}}
					>
						File Upload
					</AppButton>
				</StyledWrapper>

				<AppView>
					{!isMultiple && file && (
						<AppView
							key={file.file}
							marginBottom={'5px'}
							flexDirection={'column'}
						>
							<AppText fontSize={12} fontWeight={'500'} lineHeight={15}>
								{file.name}.{file.format}
							</AppText>
						</AppView>
					)}

					{isMultiple &&
						files?.map(file => (
							<AppView
								key={file.file}
								marginBottom={'5px'}
								flexDirection={'column'}
							>
								<AppText fontSize={12} fontWeight={'500'} lineHeight={15}>
									{file.name}.{file.format}
								</AppText>
							</AppView>
						))}
				</AppView>

				{error?.message?.key && (
					<FormControl.ErrorMessage
						leftIcon={<WarningOutlineIcon size='xs' />}
						_text={{
							fontSize: 'xs',
							color: 'error.400'
						}}
					>
						{t(error.message.key, {
							field: inputLabel ? t(inputLabel) : undefined,
							min: error.message?.values?.min
								? error.message.values.min
								: undefined,
							max: error.message?.values?.max
								? error.message.values.max
								: undefined
						})}
					</FormControl.ErrorMessage>
				)}
			</FormControl>
		)
	}
)

AppFileUpload.displayName = 'AppFileUpload'

export { AppFileUpload }
