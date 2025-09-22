import type { AsyncDataRequestStatus } from "#app";
import type { openmeteoDay, openmeteoPeriod, WeatherDescriptions } from "~/types";

export type WeatherAPIResponse = {
	coordinates: string
	weather: {
		data: {
			coordinates: string[];
			current: {
				time: string;
				precipitation: number;
				temperature2m: number;
				isDay: number;
				apparentTemperature: number;
			}
			periods: openmeteoPeriod[];
			daily: openmeteoDay[];
			descriptions: WeatherDescriptions[];
		},
		status: AsyncDataRequestStatus,
		// @ts-ignore -- Can't find type
		refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
	}
}

export const useWeatherApi = async () => {

  const {
    location,
    coordinates
  } = await useLocationStore();

  const { data, status, refresh } = await useFetch(`/api/weather/`,{ 
    query: {
        location: coordinates
    },
    watch: [coordinates],
    lazy: true
  });

  watch(location, (newValue) => {
    if(newValue){
      refresh()
    }
  })


  return {
    data,
    status,
    location,
    coordinates
  }
}
