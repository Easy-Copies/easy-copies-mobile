// React Redux
import { combineReducers } from '@reduxjs/toolkit'

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Redux Persist
import { persistReducer } from 'redux-persist'

// Reducers / Slices
import appReducer from '@/features/app/redux/slice'
import authReducer from '@/features/auth/redux/slice'

// RTK
import { emptySplitApi } from '@/features/app/redux'

// App reducer
const appPersistConfig = {
	key: 'app',
	storage: AsyncStorage,
	whitelist: ['language']
}
const app = persistReducer(appPersistConfig, appReducer)

// AUth reducer
const authPersistConfig = {
	key: 'auth',
	storage: AsyncStorage,
	whitelist: ['isAuthenticated', 'token', 'refreshToken']
}
const auth = persistReducer(authPersistConfig, authReducer)

const rootReducer = combineReducers({
	app,
	auth,
	[emptySplitApi.reducerPath]: emptySplitApi.reducer
})

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer
