import type { openmeteo, WeatherDescriptions } from '../../../types.ts';
import weatherRequest from '../../routes/weatherRequest';

export default defineEventHandler(async (event) => {
	const coordinatesString = getRouterParam(event, 'coordinates');

	const { data: { location } } = await readBody(event);

	try {
		const openmeteo = await weatherRequest.fetchOpenMeteo(new Date(), location.coordinates.latitude, location.coordinates.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone) as openmeteo;

		const weathergovAlerts = await weatherRequest.fetchWeatherAlerts(openmeteo.current.time, location.coordinates.latitude, location.coordinates.longitude);

		const weathergovDescriptions = await weatherRequest.fetchWeatherDescriptions(new Date(), location.coordinates.latitude, location.coordinates.longitude) as WeatherDescriptions[]

		return {
			coordinates: location.coordinates,
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
