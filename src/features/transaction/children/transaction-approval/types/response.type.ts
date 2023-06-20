// Interfaces
import { IAppResponse } from '@/features/app/types'
import { ITransactionApproval } from './transaction-approval.type'

export type ITransactionApprovalResponseDetail =
	IAppResponse<ITransactionApproval>
