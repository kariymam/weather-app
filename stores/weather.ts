import { defineStore } from 'pinia'
import type { openmeteo, WeatherAPIResponse, WeatherDescriptions, WeatherGovAlert } from '~/types'

export const weatherStore = defineStore('weather', {
  state: () => ({
    weatherCoordinates: '',
    openmeteo: {} as openmeteo,
    weatherGov_alerts: [] as WeatherGovAlert | [],
    weatherGov_descriptions: [] as WeatherDescriptions[],
    weather: {} as WeatherAPIResponse["weather"]["data"]
  }),
  getters: {
    currentWeatherDescription: state => state.weather.descriptions.shift()
  },
  actions: {
    saveWeatherData(weather: WeatherAPIResponse["weather"]["data"]) {
      return this.weather = weather
    },
    updateCoordinates(string: string) {
      return this.weatherCoordinates = string
    },
    updateOpenmeteoRes(res: openmeteo) {
      return this.openmeteo = res
    },
    updateWeatherGovAlerts(res: WeatherGovAlert | []) {
      return this.weatherGov_alerts = res
    },
    updateWeatherGovDescriptions(res: WeatherDescriptions[]) {
      return this.weatherGov_descriptions = res
    },
  }
})
