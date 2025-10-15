import { defineStore } from 'pinia'
import type { openmeteo, WeatherDescriptions, WeatherGovAlert } from '~/types'

export const weatherStore = defineStore('weather', {
  state: () => ({
    openmeteo: {} as openmeteo,
    weatherGov_alerts: [] as WeatherGovAlert[] | [],
    weatherGov_descriptions: [] as WeatherDescriptions[],
  }),
  actions: {
    updateOpenmeteoRes(res: openmeteo) {
      return this.openmeteo = res
    },
    updateWeatherGovAlerts(res: WeatherGovAlert[] | []) {
      return this.weatherGov_alerts = res
    },
    updateWeatherGovDescriptions(res: WeatherDescriptions[]) {
      return this.weatherGov_descriptions = res
    },
  }
})
