export const BASE_URL = {
	OPENMETEO: 'https://api.open-meteo.com/v1/forecast',
	WEATHERGOV_ALERTS: 'https://api.weather.gov/alerts/active?',
	WEATHERGOV_FORECAST: (lat: string, long: string) => `https://api.weather.gov/points/${lat},${long}`,
};

export const WEATHERGOV_HEADER = {
	headers: {
		accept: 'application/geo+json',
	}
}