import { addHours, addMinutes, format, parseJSON } from "date-fns"

export const useFormatDate = (ISOString: string, string?: string) => {

	let date = (string: string) => {
		const currentTime = new Date()
		let date = parseJSON(string)
		date = addHours(date, currentTime.getHours())
		date = addMinutes(date, currentTime.getMinutes())
		return date
	}

	const today = date(ISOString)

	return format(today, string ? string : 'MMM d')
}