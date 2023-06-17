// Constant
import { E_APP_LANGUAGE } from '@/features/app/constants'

// Locales
import { appEn, appId } from '@/features/app/locales'
import { optionsEn, optionsId } from '@/features/options/locales'
import { todoEn, todoId } from '@/features/todo/locales'
import { authEn, authId } from '@/features/auth/locales'
import { homeEn, homeId } from '@/features/home/locales'
import { storeEn, storeId } from '@/features/store/locales'
import { transactionEn, transactionId } from '@/features/transaction/locales'

const language = {
	[E_APP_LANGUAGE.EN]: {
		translation: {
			...appEn,
			...optionsEn,
			...todoEn,
			...authEn,
			...homeEn,
			...storeEn,
			...transactionEn
		}
	},
	[E_APP_LANGUAGE.ID]: {
		translation: {
			...appId,
			...optionsId,
			...todoId,
			...authId,
			...homeId,
			...storeId,
			...transactionId
		}
	}
}

export { language }
