import { format } from 'date-fns';
import { fetchWeatherApi } from 'openmeteo';
import { filterTodayPeriods } from '~/utils';

const BASE_URL = {
	OPENMETEO: 'https://api.open-meteo.com/v1/forecast',
	WEATHERGOV_ALERTS: 'https://api.weather.gov/alerts?',
};

async function fetchOpenMeteo(lat: string, long: string, zone?: string) {
	const params = {
		latitude: lat,
		longitude: long,
		hourly: ['temperature_2m', 'apparent_temperature', 'precipitation_probability', 'showers', 'rain', 'snowfall'],
		current: ['temperature_2m', 'precipitation', 'is_day', 'apparent_temperature'],
		timezone: zone,
		wind_speed_unit: 'mph',
		temperature_unit: 'fahrenheit',
	};
	const [response] = await fetchWeatherApi(BASE_URL.OPENMETEO, params);
	const utcOffsetSeconds = response.utcOffsetSeconds();
	const current = response.current()!;
	const hourly = response.hourly()!;
	const periods = Array.from({ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, (_, i) => ({
		time: format(new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000).toISOString(), 'PPpp'),
		temperature2m: hourly.variables(0)!.valuesArray()![i],
		apparentTemperature: hourly.variables(1)!.valuesArray()![i],
		precipitationProbability: hourly.variables(2)!.valuesArray()![i],
		showers: hourly.variables(3)!.valuesArray()![i],
		rain: hourly.variables(4)!.valuesArray()![i],
		snowfall: hourly.variables(5)!.valuesArray()![i],
	}));

	const periodsByHour = filterTodayPeriods(periods.map((om, i) => ({
		...om,
		...(periods && periods[i] ? periods[i] : {}),
	})), 'time');

	return {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			temperature2m: current.variables(0)!.value(),
			precipitation: current.variables(1)!.value(),
			isDay: current.variables(2)!.value(),
			apparentTemperature: current.variables(3)!.value(),
		},
		periods: periodsByHour,
	};
}

async function fetchWeatherGovAlerts(startTime: string, lat: string, long: string) {
	const params = new URLSearchParams([
		['start', startTime],
		['message_type', 'alert'],
		['point', `${lat},${long}`],
		// ['urgency', 'Immediate'],
		// ['severity', 'Severe'],
		// ['certainty', 'Observed'],
		['limit', '500'],
	]).toString();

	const weathergovAlerts = await fetch(BASE_URL.WEATHERGOV_ALERTS + params, {
		headers: {
			accept: 'application/geo+json',
		},
	}).then(r => r.json()).catch((error) => {
		console.error(error);
		return error.status(500).json({ message: error });
	});

	return weathergovAlerts;
}

export default defineEventHandler(async (event) => {
	const { coordinates } = getRouterParams(event);

	function getLatAndLong(param: string) {
		return param.split(',');
	}

	const [lat, long] = getLatAndLong(coordinates);

	const openmeteo = await fetchOpenMeteo(lat, long, Intl.DateTimeFormat().resolvedOptions().timeZone);
	const weathergov = await fetchWeatherGovAlerts(openmeteo.current.time.toISOString(), lat, long);

	return {
		coordinates,
		current: openmeteo.current,
		periods: openmeteo.periods,
		alerts: weathergov,
	};
});
