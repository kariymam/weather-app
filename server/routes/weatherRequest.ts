import { fetchWeatherApi } from 'openmeteo';
import { openmeteo, WeatherDescriptions, WeatherGovAlert } from '~/types';
import { WEATHERGOV_HEADER, BASE_URL } from '~/constants';
import { format, isSameDay, addDays } from 'date-fns';

type weathergovPeriods = {
  number: number,
  name: string,
  startTime: string,
  endTime: string,
  isDaytime: boolean,
  temperature: number,
  temperatureUnit: string,
  temperatureTrend?: string,
  probabilityOfPrecipitation: {
    unitCode: string,
    value: number
  }
  windSpeed: string,
  windDirection: string,
  icon: string,
  shortForecast: string,
  detailedForecast: string,
}

const getWeathergovRes = async (base_url: string, params?: URLSearchParams, header = WEATHERGOV_HEADER) => {
	return await fetch((params ? base_url + params.toString() : base_url), header).then(r => r.json()).catch((error) => {
		console.error(error);
		return error.status(500).json({ message: error });
	});
}

async function fetchOpenMeteo(currentTime: Date, lat: string, long: string, zone: string) {

	const today = new Date(currentTime.setHours(0,0,0,0));
	const dayIn7 = addDays(today, 6);

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
			'weather_code'
		],
		current: [
			'temperature_2m', 
			'precipitation', 
			'is_day', 
			'apparent_temperature',
			'weather_code'
		],
		timezone: zone,
		wind_speed_unit: 'mph',
		temperature_unit: 'fahrenheit',
		models: "gfs_seamless",
		start_date: format(today, 'yyyy-MM-dd'),
		end_date: format(dayIn7, 'yyyy-MM-dd'),
	};
	const [response] = await fetchWeatherApi(BASE_URL.OPENMETEO, params);
	const utcOffsetSeconds = response.utcOffsetSeconds();
	const current = response.current()!;
	const hourly = response.hourly()!;
	const daily = response.daily()!;

	/** Hourly forecast */
	const hourlyArr = [...Array.from({ length: ((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()) }, (_, i) => ({
		time: new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000).toISOString(),
		temperature2m: hourly.variables(0)!.valuesArray()![i],
		apparentTemperature: hourly.variables(1)!.valuesArray()![i],
		precipitationProbability: hourly.variables(2)!.valuesArray()![i],
		showers: hourly.variables(3)!.valuesArray()![i],
		rain: hourly.variables(4)!.valuesArray()![i],
		snowfall: hourly.variables(5)!.valuesArray()![i],
		weather_code: hourly.variables(6)!.valuesArray()![i]
	}))].filter(({ time }) => isSameDay(today, time))

	/** Daily forecast */
	const dailyArr = Array.from({ length: ((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()) }, (_, i) => ({
		time: new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000).toISOString(),
		temperature_2m_max: daily.variables(0)!.valuesArray()![i],
		apparent_temperature_max: daily.variables(1)!.valuesArray()![i],
		temperature_2m_min: daily.variables(2)!.valuesArray()![i],
		apparent_temperature_min: daily.variables(3)!.valuesArray()![i],
		precipitation_probability_max: daily.variables(4)!.valuesArray()![i],
		precipitation_hours: daily.variables(5)!.valuesArray()![i],
		weather_code: daily.variables(6)!.valuesArray()![i],
	}))

	return {
		current: {
			time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000).toISOString(),
			temperature2m: current.variables(0)!.value(),
			precipitation: current.variables(1)!.value(),
			isDay: current.variables(2)!.value(),
			apparentTemperature: current.variables(3)!.value(),
			weather_code: current.variables(4)!.value(),
		},
		periods: hourlyArr,
		daily: dailyArr,
	} as openmeteo;
}

async function fetchWeatherAlerts(startTime: Date, lat: string, long: string) {

	const start = new Date(startTime.setUTCHours(0, 0, 0, 0)).toISOString()

	const params = new URLSearchParams([
		['message_type', 'alert'],
		['point', `${lat},${long}`],
		// ['urgency', 'Immediate'],
		// ['severity', 'Severe'],
		// ['certainty', 'Observed'],
	]);

	const weathergovAlerts = await getWeathergovRes(BASE_URL.WEATHERGOV_ALERTS, params)

	return weathergovAlerts["features"] as WeatherGovAlert[] | []
}

async function fetchWeatherDescriptions(currentTime: Date, lat: string, long: string) {

	const weathergov = await getWeathergovRes(BASE_URL.WEATHERGOV_FORECAST(lat, long))

	const forecast = async ({ properties }) => { 
        const response = await getWeathergovRes(properties.forecast)
		return response
	}

	const data = await forecast(weathergov)

	const checkTime = (obj: weathergovPeriods) => currentTime.getHours() >= 20 ? !obj.isDaytime : obj.isDaytime;

	for (let key in data) {
		if (key === 'properties' && data[key].hasOwnProperty("periods")){
			return data[key]["periods"].map((obj: weathergovPeriods) => { 
				return checkTime(obj) ? {
					startTime: obj.startTime,
					endTime: obj.endTime,
					detailedForecast: obj.detailedForecast, 
					shortForecast: obj.shortForecast
				} as WeatherDescriptions : false
			}).filter(Boolean) as Array<WeatherDescriptions>
		}
	}

}

export default {
	fetchWeatherAlerts,
	fetchWeatherDescriptions,
	fetchOpenMeteo,
};
