import * as yup from 'yup'

export const yupLocale = {}

yup.setLocale({
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
		},
		min: ({ min }) => ({
			key: 'app.validations.stringMin',
			values: { min }
		}),
		max: ({ max }) => ({
			key: 'app.validations.stringMax',
			values: { max }
		})
	},
	number: {},
	boolean: {}
})
