// Types
import { EStoreServiceName } from '@/features/store/children/store-service/types/store-service.type'

export interface ITransaction {
	id: string
	storeId: string
	storeName: string
	storePhoneNumber: string
	storeEmail: string
	storePricePerSheet: number
	storeAddress: string
	storeAddressNote: string | null
	storeProvince: {
		code: string
		name: string
	}
	storeRegency: {
		code: string
		regencyCode: string
		name: string
	} | null
	storeDistrict: {
		code: string
		regencyCode: string
		name: string
	} | null
	storePostalCode: string
	storeMapCoordinate: { longitude: number; latitude: number } | null
	storeLogo: string | null
	storePhoto: string
	storeServiceType: EStoreServiceName
	paperType: string
	inkType: string
	sheetLength: number
	pickupDate: Date
	responsiblePerson: string
	files: {
		name: string
		format: string
		size: number
		file: string
	}[]
	description: string | null
	totalPrice: number
	status: ETransactionApprovalStatus
	userId: string
	createdAt: Date
	updatedAt: Date
}

export enum ETransactionApprovalStatus {
	WaitingPayment = 'WaitingPayment',
	WaitingConfirmation = 'WaitingConfirmation',
	OnProcess = 'OnProcess',
	ReadyToPickup = 'ReadyToPickup',
	Canceled = 'Canceled',
	Rejected = 'Rejected',
	Done = 'Done'
}

export type TTransactionForm = {
	storeService: EStoreServiceName
	paperType: string
	inkType: string
	sheetLength: number
	pickupDate: string
	responsiblePerson: string
	description: string
	files: {
		name: string
		format: string
		size: number
		file: string
	}[]
}
