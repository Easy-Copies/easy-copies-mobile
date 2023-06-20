// React
import { memo } from 'react'

// Components
import {
	StyledIntroCard,
	StyledIntroCardLogo,
	StyledIntroCardLogoEasyCopies
} from './components'
import { AppText, AppView } from '@/features/app/components'

const Items = memo(() => {
	return (
		<StyledIntroCard paddingRight={20}>
			<AppView flexDirection={'row'} alignItems={'center'}>
				<AppView marginRight={10}>
					<StyledIntroCardLogo>
						<StyledIntroCardLogoEasyCopies />
					</StyledIntroCardLogo>
				</AppView>

				<AppView width={250}>
					<AppText fontSize={12} fontWeight={'700'} lineHeight={15}>
						Apa itu Easy Copies?
					</AppText>
					<AppView paddingRight={10}>
						<AppText
							fontSize={10}
							marginBottom={'5px'}
							marginTop={'5px'}
							lineHeight={15}
							numberOfLines={2}
						>
							Aplikasi revolusioner yang menghadirkan solusi terbaik untuk
							menghubungkan kamu dengan bisnis printing terdekat secara online
							dan efisien. Ayo rasakan cara baru yang praktis unt...
						</AppText>
					</AppView>
					<AppText fontSize={9} fontWeight={'700'} lineHeight={15}>
						Baca Selengkapnya
					</AppText>
				</AppView>
			</AppView>
		</StyledIntroCard>
	)
})

Items.displayName = 'Items'

export { Items }
