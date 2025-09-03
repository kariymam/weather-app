import type { openmeteo } from '../../../types.ts';
import weatherRequest from '../../routes/weatherRequest';

export default defineEventHandler(async (event) => {
	const coordinatesString = getRouterParam(event, 'coordinates');

	const { data: { place_name, coordinates } } = await readBody(event);

	// console.log(coordinatesString, place_name, coordinates);

	try {
		const openmeteo = await weatherRequest.fetchOpenMeteo(coordinates.latitude, coordinates.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone) as openmeteo;

		const weathergovAlerts = await weatherRequest.fetchWeatherAlerts(openmeteo.current.time, coordinates.latitude, coordinates.longitude);

		return {
			coordinates,
			current: openmeteo.current,
			periods: openmeteo.periods,
			daily: openmeteo.daily,
			alerts: weathergovAlerts.features,
		};
	}
	catch (error) {
		return console.error(error);
	}
});
