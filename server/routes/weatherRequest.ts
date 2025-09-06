import { fetchWeatherApi } from 'openmeteo';
import { isSameDay, isThisHour, addHours } from 'date-fns';
import { openmeteoPeriod, WeatherDescriptions, weathergovPeriods } from '~/types';

const BASE_URL = {
	OPENMETEO: 'https://api.open-meteo.com/v1/forecast',
	WEATHERGOV_ALERTS: 'https://api.weather.gov/alerts?',
	WEATHERGOV_FORECAST: (lat: string, long: string) => `https://api.weather.gov/points/${lat},${long}`,
};

const WEATHERGOV_HEADER = {
	headers: {
		accept: 'application/geo+json',
	}
}

const getWeathergovRes = async (base_url: string, params?: URLSearchParams, header = WEATHERGOV_HEADER) => {
	return await fetch((params ? base_url + params.toString() : base_url), header).then(r => r.json()).catch((error) => {
		console.error(error);
		return error.status(500).json({ message: error });
	});
}

async function fetchOpenMeteo(currentTime: Date, lat: string, long: string, zone: string) {
	const params = {
		latitude: lat,
		longitude: long,
		hourly: [
			'temperature_2m',
			'apparent_temperature',
			'precipitation_probability',
			'showers',
			'rain',
			'snowfall',
			'weather_code'
		],
		daily: [
			'temperature_2m_max',
			'apparent_temperature_max',
			'temperature_2m_min',
			'apparent_temperature_min',
			'precipitation_probability_max',
			'precipitation_hours',
		],
		current: ['temperature_2m', 'precipitation', 'is_day', 'apparent_temperature'],
		timezone: zone,
		wind_speed_unit: 'mph',
		temperature_unit: 'fahrenheit',
		models: "gfs_seamless",
	};
	const [response] = await fetchWeatherApi(BASE_URL.OPENMETEO, params);
	const utcOffsetSeconds = response.utcOffsetSeconds();
	const current = response.current()!;
	const hourly = response.hourly()!;
	const daily = response.daily()!;

	const periods = Array.from({ length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, (_, i) => ({
		time: new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000).toISOString(),
		temperature2m: hourly.variables(0)!.valuesArray()![i],
		apparentTemperature: hourly.variables(1)!.valuesArray()![i],
		precipitationProbability: hourly.variables(2)!.valuesArray()![i],
		showers: hourly.variables(3)!.valuesArray()![i],
		rain: hourly.variables(4)!.valuesArray()![i],
		snowfall: hourly.variables(5)!.valuesArray()![i],
		weather_code: hourly.variables(6)!.valuesArray()![i]
	}));

	const periodsByDay = [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)).map(
		(time, i) => {

			return {
				time: new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000).toISOString(),
				weather_code: periods.filter((obj) => obj['time'] === addHours(time, currentTime.getHours()).toISOString())[0]["weather_code"],
				temperature_2m_max: daily.variables(0)!.valuesArray()![i],
				apparent_temperature_max: daily.variables(1)!.valuesArray()![i],
				temperature_2m_min: daily.variables(2)!.valuesArray()![i],
				apparent_temperature_min: daily.variables(3)!.valuesArray()![i],
				precipitation_probability_max: daily.variables(4)!.valuesArray()![i],
				precipitation_hours: daily.variables(5)!.valuesArray()![i],
			};
		},
	);

	const period = (obj: openmeteoPeriod, prop: string) => (obj as { [key: string]: any })[prop]

	console.log(currentTime)

	function filterTodayPeriods(periods: unknown[], prop: string) {
		const filtered = periods?.filter(p => isSameDay(currentTime, period(p, 'time')));
		
		const timeIdx = filtered.findIndex(p => isThisHour((p as { [key: string]: any })[prop]));

		return filtered.slice(timeIdx);
	}

	const periodsByHour = filterTodayPeriods(periods.map((om, i) => ({
		...om,
		...(periods && periods[i] ? periods[i] : {}),
	})), 'time');

	console.log(periodsByHour)

	return {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000).toISOString(),
			temperature2m: current.variables(0)!.value(),
			precipitation: current.variables(1)!.value(),
			isDay: current.variables(2)!.value(),
			apparentTemperature: current.variables(3)!.value(),
		},
		periods: periodsByHour,
		daily: periodsByDay,
	};
}

async function fetchWeatherAlerts(startTime: string, lat: string, long: string) {
	const params = new URLSearchParams([
		['start', startTime],
		['message_type', 'alert'],
		['point', `${lat},${long}`],
		// ['urgency', 'Immediate'],
		// ['severity', 'Severe'],
		// ['certainty', 'Observed'],
		['limit', '500'],
	]);

	const weathergovAlerts = await getWeathergovRes(BASE_URL.WEATHERGOV_ALERTS, params)

	return weathergovAlerts;
}

async function fetchWeatherDescriptions(currentTime: Date, lat: string, long: string) {

	const weathergov = await getWeathergovRes(BASE_URL.WEATHERGOV_FORECAST(lat, long))

	const weathergovForecast = async ({ properties }) => { 
        const response = await getWeathergovRes(properties.forecast)
		return response
	}

	const data = await weathergovForecast(weathergov)

	const checkTime = (obj: weathergovPeriods) => currentTime.getHours() >= 20 ? !obj.isDaytime : obj.isDaytime;

	for (let key in data) {
		if (key === 'properties' && data[key].hasOwnProperty("periods")){
			return data[key].periods.map((obj: weathergovPeriods) => { 
				return checkTime(obj) ? {
					startTime: obj.startTime,
					endTime: obj.endTime,
					detailed: obj.detailedForecast, 
					short: obj.shortForecast
				} as WeatherDescriptions : false
			}).filter(Boolean)
		}
	}

}

export default {
	fetchWeatherAlerts,
	fetchWeatherDescriptions,
	fetchOpenMeteo,
};
