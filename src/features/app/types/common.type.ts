export interface IAppCommonLoading {
	isDefaultLoading: boolean
	isCreateEditLoading: boolean
	isDeleteLoading: boolean
	isDetailLoading: boolean
}

export interface IAppCommonPagination<T extends unknown[]> {
	limit: number
	page: number
	sort: string
	totalRows: number
	totalPages: number
	rows: T
}

export interface IAppCommonPaginationQuery {
	limit: number
	page: number
	sort: string
}

export type TAppCommonPagination = 'limit' | 'page' | 'sort'

export type TAppCommonValidationError = { key: string }

export type TAppFile = {
	name: string
	format: string
	size: number
	file: string
}

export enum EAppPermission {
	USER_MANAGEMENT = 'User Management',
	ROLE_MANAGEMENT = 'Role Management',
	STORE_MANAGEMENT = 'Store Management',
	STORE_MANAGEMENT_APPROVAL = 'Store Management Approval',
	STORE_MANAGEMENT_SERVICE = 'Store Management Service',
	TRANSACTION_MANAGEMENT = 'Transaction Management',
	TRANSACTION_MANAGEMENT_APPROVAL = 'Transaction Management Approval'
}
