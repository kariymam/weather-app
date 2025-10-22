export const useWeatherStore = async () => {

  const {
    UserLocation
  } = useLocationStore()

  const {
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
  } = weatherStore();

  const {
    current,
    daily,
    periods,
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions,
  } = storeToRefs(weatherStore())

  // Initial load
  const coordinates = computed(() => UserLocation.value.coordinates.join(','))
  const { data } = await useFetch(
    '/api/weather/', { 
      query: { location: coordinates.value },
      lazy: true
    }
  )

  const weather = data.value as WeatherState
  if (weather){
    updateOpenmeteoRes(weather["openmeteo"])
    updateWeatherGovAlerts(weather["weatherGov_alerts"])
    updateWeatherGovDescriptions(weather["weatherGov_descriptions"])
  }

  return {
    openmeteo,
    weatherGov_alerts,
    weatherGov_descriptions,
    current,
    daily,
    periods,
    updateOpenmeteoRes,
    updateWeatherGovAlerts,
    updateWeatherGovDescriptions,
  };
};
