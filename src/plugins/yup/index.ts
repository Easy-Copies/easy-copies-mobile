import * as yup from 'yup'

export const yupLocale = {
	mixed: {
		default: {
			key: 'app.validations.invalid'
		},
		required: {
			key: 'app.validations.required'
		}
	},
	string: {
		email: {
			key: 'app.validations.email'
		}
	},
	number: {},
	boolean: {}
}

yup.setLocale(yupLocale)
