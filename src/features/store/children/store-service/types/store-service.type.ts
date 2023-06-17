export interface IStoreService {
	id: string
	name: EStoreServiceName
	storeId: string
	pricePerSheet: number
	bindingType: string | null
	fotocopyType: string | null
	createdAt: Date
	updatedAt: Date
}

export enum EStoreServiceName {
	Laminating = 'Laminating',
	Printing = 'Printing',
	Jilid = 'Jilid',
	Fotocopy = 'Fotocopy'
}

export type TStoreServiceForm = {
	name: 'Printing'
	pricePerSheet: 800
}
