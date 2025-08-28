import type { WeatherApiResponse, WeatherCodeObj } from "~/types"

export const useGetWeatherIcon = (daily: WeatherApiResponse['daily'] | undefined) => {

  const weather_codes = ref<
  | WeatherCodeObj[]
  | undefined
  >(undefined)


  const getCodes = async () => {
   const codes = daily && await Promise.all([...daily.map(async ({ weather_code }) => {
    const { data: { value: code } } = await useFetch(`/api/weather/codes/${weather_code}`)
    return code
    })])
  weather_codes.value = codes
  return weather_codes.value
  }

  getCodes()

  return weather_codes
}
