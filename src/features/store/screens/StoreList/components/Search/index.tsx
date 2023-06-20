// React
import { memo } from 'react'

// Components
import { AppInput, AppView } from '@/features/app/components'
import { StyledImageFinderGlass } from './components'

const StoreSearch = memo(() => {
	return (
		<AppView marginTop={'10px'}>
			<AppInput
				InputLeftElement={
					<AppView
						alignItems={'center'}
						justifyContent={'center'}
						marginLeft={10}
						paddingRight={10}
					>
						<StyledImageFinderGlass />
					</AppView>
				}
				borderRadius={'full'}
				placeholder={'Cari toko...'}
			/>
		</AppView>
	)
})

StoreSearch.displayName = 'StoreSearch'

export { StoreSearch }
