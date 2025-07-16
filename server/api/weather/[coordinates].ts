import { fetchOpenMeteo, fetchWeatherGov, filterTodayPeriods } from '~/utils';

export default defineEventHandler(async (event) => {
	const { coordinates } = getRouterParams(event);
	const [lat, long] = coordinates.split(',');

	const openmeteo = await fetchOpenMeteo(lat, long, Intl.DateTimeFormat().resolvedOptions().timeZone);
	const weathergov = await fetchWeatherGov(lat, long);

	const periodsByHour = filterTodayPeriods(openmeteo.periods.map((om, i) => ({
		...om,
		...(weathergov.periods && weathergov.periods[i] ? weathergov.periods[i] : {}),
	})), 'time');

	return {
		current: openmeteo.current,
		periodsByHour,
		periodsByDay: weathergov.periodsByDay,
		alerts: weathergov.alerts,
	};
});
