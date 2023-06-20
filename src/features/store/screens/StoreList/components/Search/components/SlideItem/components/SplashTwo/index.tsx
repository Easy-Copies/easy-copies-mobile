// React
import { memo } from 'react'

// Components
import { StyledImage } from './components'
import { AppText } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

const SplashTwo = memo(() => {
	// Translation
	const { t } = useTranslation()

	return (
		<>
			<StyledImage />

			<AppText
				marginTop={10}
				fontSize={28}
				fontWeight={700}
				textAlign={'center'}
			>
				{t('app.intro.features.title')}
			</AppText>

			<AppText fontSize={18} fontWeight={600} textAlign={'center'}>
				{t('app.intro.features.description')}
			</AppText>
		</>
	)
})

SplashTwo.displayName = 'SplashTwo'

export { SplashTwo }
