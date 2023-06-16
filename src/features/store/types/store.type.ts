export interface IStore {
	id: string
	name: string
	description: string
	phoneNumber: string
	email: string
	address: string
	addressNote: string | null
	provinceCode: string
	regencyCode: string
	districtCode: string
	postalCode: string
	mapCoordinate: { longitude: number; latitude: number } | null
	storeLogo: string | null
	storePhoto: string
	nik: string
	ktpPhoto: string
	npwp: string | null
	npwpPhoto: string | null
	userId: string
	status: EStoreApprovalStatus | null
	isOpen: boolean
	createdAt: Date
	updatedAt: Date
}

/**
 * Model StoreApprovalUser
 *
 */
export type TStoreApprovalUser = {
	id: string
	userId: string
	storeId: string
	status: EStoreApprovalStatus
	statusDescription: string
	reviseComment: string | null
	rejectReason: string | null
	createdAt: Date
}

export enum EStoreApprovalStatus {
	Pending = 'Pending',
	Cancel = 'Cancel',
	Rejected = 'Rejected',
	Revise = 'Revise',
	Revised = 'Revised',
	OnReview = 'OnReview',
	Approved = 'Approved'
}

export type TStoreForm = {
	name: string
	description: string
	phoneNumber: string
	address: string
	addressNote: string | null
	provinceCode: string
	regencyCode: string
	districtCode: string
	postalCode: string
	mapCoordinate: {
		longitude: number
		latitude: number
	} | null
	storeLogo: string | null
	storePhoto: string
	nik: string
	ktpPhoto: string
	npwp: string | null
	npwpPhoto: string | null
	isOpen: boolean
}
