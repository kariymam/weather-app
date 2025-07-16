import type { WeatherGovGeoJson } from '~/types';

export const useGetWeatherAlerts = (alerts: WeatherGovGeoJson['features']) => {
	const severeAlerts = ref<{ title: string; text: string }[]>([{
		title: '',
		text: '',
	}]);

	if (alerts) {
		severeAlerts.value = alerts.map(({ properties }) => {
			if (properties !== undefined) {
				return { 
          title: properties.headline,
					text: `${properties.messageType}: ${properties.instruction}` };
			}
			else {
				return {
					title: '',
					text: '',
				};
			}
		});
	}

	return severeAlerts;
};
