// Constants
import { E_AUTH_STACK_NAVIGATION } from '@/features/app/constants'
import { E_AUTH_SIGN_TYPE } from '@/features/auth/constants'

export type TAuthStackNavigationParams = {
	[E_AUTH_STACK_NAVIGATION.LOGIN]: undefined
	[E_AUTH_STACK_NAVIGATION.REGISTER]: undefined
	[E_AUTH_STACK_NAVIGATION.OTP_VERIFY]: {
		signType: E_AUTH_SIGN_TYPE
		userId: string
	}
	[E_AUTH_STACK_NAVIGATION.FORGOT_PASSWORD]: undefined
	[E_AUTH_STACK_NAVIGATION.CHANGE_PASSWORD]: { token: string; userId: string }
}
