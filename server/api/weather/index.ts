import { openmeteo, WeatherDescriptions, WeatherGovAlert } from '~/types.js';
import weatherRequest from '../../routes/weatherRequest.js';
import { weatherStore } from '~/stores/weather.js';
import weatherCodes from '../weather/codes/descriptions.json' assert {type: 'json'}

export default defineEventHandler(async (event) => {
	const { location } = getQuery(event)

	const getCoordinates = (string: string | undefined) => {
		return !string ? [] : string.split(",")
	}

	const coordinates = getCoordinates(location as string)

	const date = new Date()

	if (coordinates.length === 0){
		throw Error("Cannot parse coordinates")
	} else {
		const [lat, long] = coordinates
		const callbacks = new Map<string, Function>([
			[
				'openmeteo', 
				async () => await weatherRequest.fetchOpenMeteo(date, lat, long, Intl.DateTimeFormat().resolvedOptions().timeZone)
			],
			[
				'weathergovAlerts', 
				async () => await weatherRequest.fetchWeatherAlerts(date, lat, long)
			],
			[
				'weathergovDescriptions',
				async () => await weatherRequest.fetchWeatherDescriptions(date, lat, long)
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
		) as [openmeteo, WeatherGovAlert[] | [], WeatherDescriptions[]]

		// const { data } = await $fetch(() => `/api/weather/codes/${code}`)

		const images = openmeteo.daily.map(({ weather_code }) => {
			const code = weatherCodes[String(weather_code) as keyof typeof weatherCodes]
			return code
		})
		
		weatherStore().updateImages(images)
		weatherStore().updateOpenmeteoRes(openmeteo)
		weatherStore().updateWeatherGovAlerts(weatherGov_alerts)
		weatherStore().updateWeatherGovDescriptions(weatherGov_descriptions)

		return {
			images,
			openmeteo, 
			weatherGov_alerts, 
			weatherGov_descriptions
		}
	}
	
});
