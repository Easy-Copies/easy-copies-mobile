// Types
import {
	TTransactionForm,
	TTransactionPayForm
} from '@/features/transaction/types'
import { EStoreServiceName } from '@/features/store/children/store-service/types/store-service.type'

export const TRANSACTION_CREATE_FORM: TTransactionForm = {
	storeService: EStoreServiceName.Laminating,
	paperType: '',
	inkType: '',
	sheetLength: null,
	pickupDate: new Date(),
	responsiblePerson: '',
	description: '',
	files: []
}

export const TRANSACTION_PAY_FORM: TTransactionPayForm = {
	senderName: '',
	bankName: '',
	accountNumber: '',
	file: null
}
