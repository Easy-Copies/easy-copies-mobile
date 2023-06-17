/**
 * @description Force string to only number
 *
 * @param {string} value
 *
 * @return {boolean} boolean
 */
export const appOnlyNumber = (value: string): boolean => {
	return (
		/^\d*$/.test(value) ||
		/^[+-]?(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/.test(value)
	)
}
