import { defineStore } from 'pinia'
import type { openmeteo, WeatherDescriptions, WeatherGovAlert } from '~/types'

export interface WeatherState {
  openmeteo: openmeteo;
  weatherGov_alerts: WeatherGovAlert[] | [];
  weatherGov_descriptions: WeatherDescriptions[];
}

export const weatherStore = defineStore('weather', {
  state: (): WeatherState => ({
    openmeteo: {} as openmeteo,
    weatherGov_alerts: [] as WeatherGovAlert[] | [],
    weatherGov_descriptions: [] as WeatherDescriptions[],
  }),
  getters: {
    current: state => state.openmeteo['current'],
    daily: state => state.openmeteo['daily'],
    periods: state => state.openmeteo['periods']
  },
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
