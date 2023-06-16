// React Navigation
import { NativeStackHeaderProps } from '@react-navigation/native-stack'

export type TAppNavigationHeader = {
	isFromSomeWhere?: boolean
	title: string
	navigation: NativeStackHeaderProps['navigation']
}
