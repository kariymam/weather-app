export const useWeatherStore = async () => {

  const {
    updateCoordinates,
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
  } = weatherStore();

  const {
    weatherCoordinates,
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions
  } = storeToRefs(weatherStore())

  return {
    weatherCoordinates,
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions,
    updateCoordinates,
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
  };
};
