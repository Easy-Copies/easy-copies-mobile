// React
import { memo } from 'react'

// Components
import { StyledImageOne, StyledImageTwo } from './components'
import { AppText } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

const SplashOne = memo(() => {
	// Translation
	const { t } = useTranslation()

	return (
		<>
			<StyledImageOne />

			<AppText
				marginTop={10}
				marginBottom={10}
				fontSize={18}
				textAlign={'center'}
				fontWeight={600}
			>
				{t('app.intro.easyPrint')}
			</AppText>

			<StyledImageTwo />
		</>
	)
})

SplashOne.displayName = 'SplashOne'

export { SplashOne }
