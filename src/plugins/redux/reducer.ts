// React Redux
import { combineReducers } from '@reduxjs/toolkit'

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage'

// Redux Persist
import { persistReducer } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// Reducers / Slices
import appReducer from '@/features/app/redux/slice'
import authReducer from '@/features/auth/redux/slice'

// RTK
import { emptySplitApi } from '@/features/app/redux'

// App reducer
const app = persistReducer<ReturnType<typeof appReducer>>(
	{
		key: 'app',
		storage: AsyncStorage,
		whitelist: ['language'],
		stateReconciler: hardSet
	},
	appReducer
)

// Auth reducer
const auth = persistReducer<ReturnType<typeof authReducer>>(
	{
		key: 'auth',
		storage: AsyncStorage,
		whitelist: ['isAuthenticated', 'tokens', 'authenticatedUser'],
		stateReconciler: hardSet
	},
	authReducer
)

const rootReducer = combineReducers({
	app,
	auth,
	[emptySplitApi.reducerPath]: emptySplitApi.reducer
})

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer
