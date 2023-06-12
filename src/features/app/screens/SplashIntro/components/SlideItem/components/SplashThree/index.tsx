// React
import { memo } from 'react'

// Components
import { StyledImage } from './components'
import { AppText } from '@/features/app/components'

// i18n
import { useTranslation } from 'react-i18next'

const SplashThree = memo(() => {
	// Translation
	const { t } = useTranslation()

	return (
		<>
			<AppText
				marginTop={10}
				marginBottom={2}
				fontSize={28}
				fontWeight={700}
				textAlign={'center'}
			>
				{t('app.intro.easyAndFast.title')}
			</AppText>

			<AppText
				fontSize={18}
				marginTop={3}
				marginBottom={5}
				fontWeight={600}
				textAlign={'center'}
			>
				{t('app.intro.easyAndFast.description')}
			</AppText>

			<StyledImage />
		</>
	)
})

SplashThree.displayName = 'SplashThree'

export { SplashThree }
