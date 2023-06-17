export enum E_APP_STACK_NAVIGATION {
	AUTH = 'Auth',
	SPLASH = 'Splash',
	SPLASH_INTRO = 'SplashIntro',
	ENTRY_POINT = 'AppEntryPoint',
	APP = 'App',
	STORE = 'Store'
}

export enum E_APP_DRAWER_NAVIGATION {
	HOME_PARENT = 'HomeParent',
	OPTION_PARENT = 'OptionParent',
	TODO_PARENT = 'TodoParent'
}

export enum E_APP_BOTTOM_TAB_NAVIGATION {
	HOME = 'HomeBottomTab',
	TRANSACTION = 'TransactionBottomTab',
	ACCOUNT = 'AccountTransactionBottomTab'
}

export enum E_AUTH_STACK_NAVIGATION {
	LOGIN = 'Login',
	REGISTER = 'Register',
	FORGOT_PASSWORD = 'ForgotPassword',
	CHANGE_PASSWORD = 'ChangePassword',
	OTP_VERIFY = 'OtpVerify'
}

export enum E_HOME_STACK_NAVIGATION {
	HOME = 'Home'
}

export enum E_OPTION_STACK_NAVIGATION {
	OPTION = 'Option'
}

export enum E_TODO_STACK_NAVIGATION {
	TODO = 'Todo'
}

export enum E_STORE_STACK_NAVIGATION {
	STORE_LIST = 'StoreList',
	STORE_DETAIL = 'StoreDetail'
}
