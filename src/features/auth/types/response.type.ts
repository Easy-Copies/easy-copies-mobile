// Interfaces
import { IAppResponse } from '@/features/app/types'
import { IAuth, IAuthUser, IAuthToken } from './auth.type'

export type TAuthResponseToken = IAppResponse<IAuthToken>
export type TAuthResponseRegister = IAppResponse<IAuthUser>
export type TAuthResponseMe = IAppResponse<IAuth>
export type TAuthResponseUser = IAppResponse<IAuthUser>
export type TAuthResponseNull = IAppResponse<null>
