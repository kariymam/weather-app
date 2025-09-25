import type { WeatherApiResponse } from "~/types";

export type ImageObj = {
	day: {
        description: string;
        image: string;
    };
    night: {
        description: string;
        image: string;
    }
}

export const useGetWeatherCodes = async (daily: WeatherApiResponse['daily'] | undefined) => {

  const images: Ref<ImageObj[]> = ref([])

  if (daily){
    for (const obj of daily) {
      const code = await $fetch(`/api/weather/codes/${obj["weather_code"]}`)

      if(code) {
        images.value.push(code)
      }
    }
  }
  
  return images
}
