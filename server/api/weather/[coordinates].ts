import type { openmeteo, WeatherDescriptions } from '../../../types.ts';
import weatherRequest from '../../routes/weatherRequest';

export default defineEventHandler(async (event) => {
	const coordinatesString = getRouterParam(event, 'coordinates');

	const { data: { place_name, coordinates } } = await readBody(event);

	try {
		const openmeteo = await weatherRequest.fetchOpenMeteo(coordinates.latitude, coordinates.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone) as openmeteo;

		const weathergovAlerts = await weatherRequest.fetchWeatherAlerts(openmeteo.current.time, coordinates.latitude, coordinates.longitude);

		const weathergovDescriptions = await weatherRequest.fetchWeatherDescriptions(coordinates.latitude, coordinates.longitude) as WeatherDescriptions[]

		return {
			coordinates,
			current: openmeteo.current,
			periods: openmeteo.periods,
			daily: openmeteo.daily,
			alerts: weathergovAlerts.features,
			descriptions: weathergovDescriptions
		};
	}
	catch (error) {
		return console.error(error);
	}
});
