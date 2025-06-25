import type { WeatherGovGeoJson } from '~/types';

const WEATHERGOV_BASE_URL = 'https://api.weather.gov/points/';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const weatherSources = async (
	source: string,
	/**
   * @param sources
   * The sources for weather data called in parallel
   * ["weathergov", "openweatherapi"]
   *  */
	coordinates: string[],
	/**
   * @param coordinates
   * [latitude, longitude]
   *  */
	apiKey: string,
) => {
	const [latitude, longitude] = coordinates;

	switch (source) {
		case 'weathergov':

		{
			const { properties } = await $fetch(`${WEATHERGOV_BASE_URL}${latitude},${longitude}`) as WeatherGovGeoJson;

			const weathergov = await Promise.all([properties?.forecast, properties?.forecastHourly, `https://api.weather.gov/alerts/active?point=${latitude},${longitude}`].map(url => url ? fetch(url) : url));

			// Filter out errors
			const errors = weathergov.filter(response => (response instanceof Response && !response.ok)) as Response[];

			// Filter out data
			const data = weathergov.filter(response => (response instanceof Response && response.ok)) as Response[];

			if (errors.length > 0) {
				throw errors.map(
					response => new Error(`Failed to fetch: ${response}`),
				);
			}

			return await Promise.all(data.map(response => response.json()));
		}
		case 'openweatherapi':
		{
			const openweatherapi = await $fetch(`${OPENWEATHER_BASE_URL}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`);

			return openweatherapi;
		}
		default:
			break;
	}
};

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const forecastSources = ['weathergov', 'openweatherapi'];
	const { coordinates } = getRouterParams(event);

	const fetchForecastData = async (
		sources: string[],
		coordinates: string[],
		callback: Promise<unknown>[] = sources.map(source => weatherSources(source, coordinates, config.openweather)),
	): Promise<PromiseSettledResult<unknown>[]> => {
		const responses = Promise.allSettled(await callback);
		return responses;
	};

	return fetchForecastData(forecastSources, coordinates.split(','));
});
