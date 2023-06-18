type TDatePickerOptions = {
	date: Date
	mode: 'date' | 'time'
	show: boolean
}

export enum EDatePickerOptionsActionType {
	SET_DATE = 'SET_DATE',
	SET_MODE = 'SET_MODE',
	SET_SHOW = 'SET_SHOW'
}

type TActionPayload =
	| {
			type: EDatePickerOptionsActionType.SET_DATE
			payload: TDatePickerOptions['date']
	  }
	| {
			type: EDatePickerOptionsActionType.SET_MODE
			payload: TDatePickerOptions['mode']
	  }
	| {
			type: EDatePickerOptionsActionType.SET_SHOW
			payload: TDatePickerOptions['show']
	  }

export const datePickerOptionsReducer = (
	state: TDatePickerOptions,
	{ type, payload }: TActionPayload
) => {
	switch (type) {
		case EDatePickerOptionsActionType.SET_DATE:
			return { ...state, date: payload }
		case EDatePickerOptionsActionType.SET_MODE:
			return { ...state, mode: payload }
		case EDatePickerOptionsActionType.SET_SHOW:
			return { ...state, show: payload }
		default:
			return state
	}
}
