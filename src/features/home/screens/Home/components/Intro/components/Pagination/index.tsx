// React
import { memo } from 'react'

// React Native
import { StyleSheet, Animated, View, Dimensions } from 'react-native'

// Types
import { TSplashIntroPaginationProps } from './types'

// Init Dimensions
const { width } = Dimensions.get('screen')

const SplashIntroPagination = memo(
	({ data, scrollX }: TSplashIntroPaginationProps) => {
		return (
			<View style={styles.container}>
				{data.map((_, idx) => {
					const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width]

					const backgroundColor = scrollX.interpolate({
						inputRange,
						outputRange: ['#ccc', '#000', '#ccc'],
						extrapolate: 'clamp'
					})

					return (
						<Animated.View
							key={idx.toString()}
							style={[styles.dot, { backgroundColor }]}
						/>
					)
				})}
			</View>
		)
	}
)

SplashIntroPagination.displayName = 'SplashIntroPagination'

export { SplashIntroPagination }

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginHorizontal: 3,
		backgroundColor: '#ccc'
	},
	dotActive: {
		backgroundColor: '#000'
	}
})
