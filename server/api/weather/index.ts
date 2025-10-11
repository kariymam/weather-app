import { openmeteo, WeatherDescriptions, WeatherGovAlert } from '~/types.js';
import weatherRequest from '../../routes/weatherRequest.js';

export default defineEventHandler(async (event) => {

	const { location } = getQuery(event)

	const getCoordinates = (string: string | undefined) => {
		return !string ? [] : string.split(",")
	}

	const coordinates = getCoordinates(location as string)

	
	if (coordinates.length === 0){
		throw Error("Cannot parse coordinates")
	} else {
		const [lat, long] = coordinates
		const callbacks = new Map<string, Function>([
			[
				'openmeteo', 
				async () => await weatherRequest.fetchOpenMeteo(new Date(), lat, long, Intl.DateTimeFormat().resolvedOptions().timeZone)
			],
			[
				'weathergovAlerts', 
				async () => await weatherRequest.fetchWeatherAlerts(new Date().toISOString(), lat, long)
			],
			[
				'weathergovDescriptions',
				async () => await weatherRequest.fetchWeatherDescriptions(new Date(), lat, long)
			]
		]);

		const [openmeteo, weatherGov_alerts, weatherGov_descriptions] = await Promise.all(
			Array.from(callbacks).map(async ([_, callback]) => {
				try {
					return await callback();
				} catch (error) {
					return { error };
				}
			})
		) as [openmeteo, WeatherGovAlert | [], WeatherDescriptions[]]

		return {
			coordinates,
			openmeteo, 
			weatherGov_alerts, 
			weatherGov_descriptions
		}
	}
	
});
