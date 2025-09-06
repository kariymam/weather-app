import type { openmeteo, WeatherDescriptions } from '../../../types.js';
import weatherRequest from '../../routes/weatherRequest.js';

export default defineEventHandler(async (event) => {

	const { location } = getQuery(event)

	const getCoordinates = (string: string | undefined) => {
		return !string ? [] : string.split(",")
	}

	const coordinates = getCoordinates(location as string)

	if (coordinates.length === 0){
		 throw Error("No coordinates")
	} else {
		const [lat, long] = coordinates

		try {
		const openmeteo = await weatherRequest.fetchOpenMeteo(new Date(), lat, long, Intl.DateTimeFormat().resolvedOptions().timeZone) as openmeteo;

		const weathergovAlerts = await weatherRequest.fetchWeatherAlerts(openmeteo.current.time, lat, long);

		const weathergovDescriptions = await weatherRequest.fetchWeatherDescriptions(new Date(), lat, long) as WeatherDescriptions[]

		return {
			coordinates,
			current: openmeteo.current,
			periods: openmeteo.periods,
			daily: openmeteo.daily,
			alerts: weathergovAlerts.features,
			descriptions: weathergovDescriptions
		};
	}
	catch (error: unknown) {
		return console.error(error);
	}
}
	
});
