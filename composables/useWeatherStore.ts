export const useWeatherStore = async () => {

  const {
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
  } = weatherStore();

  const {
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions,
  } = storeToRefs(weatherStore())

  return {
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions,
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
  };
};
