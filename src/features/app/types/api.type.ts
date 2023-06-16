// Interfaces
import { IAppCommonPagination } from '@/features/app/types'

export interface IAppResponse<T = unknown> {
	message: string
	result: T
}

export interface IAppResponsePagination<T extends unknown[]> {
	message: string
	result: IAppCommonPagination<T>
}

export interface IAppResponseError {
	errors: {
		message: string
		field?: string
	}[]
}

export interface IAppPaginationQuery {
	limit?: number
	page?: number
	sort?: 'desc' | 'asc'
	column?: string
}
