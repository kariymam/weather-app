export const useWeatherStore = () => {

  const {
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
    updateImages,
  } = weatherStore();

  const {
    images,
    current,
    daily,
    periods,
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions,
    currentDescription,
  } = storeToRefs(weatherStore())

  return {
    current,
    daily,
    periods,
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions,
    currentDescription,
    images,
    updateImages,
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
  };
};
