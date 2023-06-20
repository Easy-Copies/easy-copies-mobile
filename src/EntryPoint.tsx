// React
import { useEffect } from 'react'

// React Native
import { StatusBar } from 'react-native'

// App Navigation
import { AppRootStackNavigation } from './features/app/navigations'

// Plugins
import { useAppDispatch, useAppSelector } from './plugins'

// Redux
import {
	appGetLanguage,
	app_HANDLE_LANGUAGE,
	app_HANDLE_INITIALIZE,
	appGetInitialized
} from './features/app/redux'
import {
	authGetIsAuthenticated,
	auth_HANDLE_AUTHENTICATED_USER,
	useLazyAuth_meQuery
} from './features/auth/redux'

const EntryPoint = (): JSX.Element => {
	// Dispatcher
	const dispatch = useAppDispatch()

	// Selector
	const appLanguage = useAppSelector(appGetLanguage)
	const appIsInitialized = useAppSelector(appGetInitialized)
	const authIsAuthenticated = useAppSelector(authGetIsAuthenticated)

	// RTK
	const [getAuthenticatedUser] = useLazyAuth_meQuery()

	// Handle localization
	useEffect(() => {
		dispatch(app_HANDLE_LANGUAGE(appLanguage))

		// eslint-disable-next-line
	}, [])

	// Handle any async request before opening the app
	useEffect(() => {
		// Make loader of the app
		dispatch(app_HANDLE_INITIALIZE(false))

		setTimeout(() => {
			dispatch(app_HANDLE_INITIALIZE(true))
		}, 3000)
	}, [dispatch])

	// Load authenticated user when already authenticated
	useEffect(() => {
		// eslint-disable-next-line
		;(async () => {
			try {
				if (authIsAuthenticated && appIsInitialized) {
					const response = await getAuthenticatedUser().unwrap()

					dispatch(auth_HANDLE_AUTHENTICATED_USER(response.result))
				}
			} catch (_) {
				//
			}
		})()
	}, [authIsAuthenticated, appIsInitialized, getAuthenticatedUser, dispatch])

	return (
		<>
			<StatusBar barStyle={'light-content'} />
			<AppRootStackNavigation />
		</>
	)
}

export { EntryPoint }
