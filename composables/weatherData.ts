import type { WeatherAPIResponse } from "~/types";

export const useWeatherData = (coordinates: ComputedRef<string>) => {

  const { data, status, refresh } = useFetch(`/api/weather/`,{ 
    query: {
        location: coordinates
    },
    watch: [coordinates],
    lazy: true
  });

  const {
		location,
    weather,
	} = storeToRefs(weatherStore());
  
  watch(data, (newValue) => {
    if(newValue){
      weatherStore().saveWeatherData(data.value as WeatherAPIResponse["weather"]["data"])
    }
  })

  return {
    location,
    weather,
    status
  }
}
