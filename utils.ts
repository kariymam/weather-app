import { fetchWeatherApi } from 'openmeteo';
import { isSameDay, isThisHour } from 'date-fns';
import { BASE_URL } from './constants';

export async function fetchOpenMeteo(lat: string, long: string, zone?: string) {
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
		time: new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000).toISOString(),
		temperature2m: hourly.variables(0)!.valuesArray()![i],
		apparentTemperature: hourly.variables(1)!.valuesArray()![i],
		precipitationProbability: hourly.variables(2)!.valuesArray()![i],
		showers: hourly.variables(3)!.valuesArray()![i],
		rain: hourly.variables(4)!.valuesArray()![i],
		snowfall: hourly.variables(5)!.valuesArray()![i],
	}));
	return {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
			temperature2m: current.variables(0)!.value(),
			precipitation: current.variables(1)!.value(),
			isDay: current.variables(2)!.value(),
			apparentTemperature: current.variables(3)!.value(),
		},
		periods,
	};
}

export async function fetchWeatherGov(lat: string, long: string) {
	const pointRes = await fetch(`${BASE_URL.WEATHERGOV}${lat},${long}`, {
		headers: {
			'User-Agent': '(https://github.com/kariymam/vue-weather-app, https://github.com/kariymam/)',
			'Accept': 'application/geo+json, application/problem+json',
		},
	}).then(r => r.json());
	const { properties } = pointRes;
	const urls = [properties.forecast, properties.forecastHourly, `https://api.weather.gov/alerts/active?point=${lat},${long}`];
	const [forecast, forecastHourly, alerts] = await Promise.all(urls.map(url => fetch(url).then(r => r.json())));
	return {
		forecast: forecast.properties,
		periods: forecastHourly.properties?.periods,
		periodsByDay: forecast.properties?.periods,
		alerts: alerts.features,
	};
}

export function filterTodayPeriods(periods: any[], prop: string) {
	const filtered = () => periods?.filter(p => isSameDay(new Date(), p[prop]));
	const timeIdx = filtered().findIndex(p => isThisHour(p[prop]));

	return filtered().slice(timeIdx);
}
