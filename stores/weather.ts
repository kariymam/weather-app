import { defineStore } from 'pinia'
import type { openmeteo, WeatherCodeObj, WeatherDescriptions, WeatherGovAlert } from '~/types'

export interface WeatherState {
  openmeteo: openmeteo;
  weatherGov_alerts: WeatherGovAlert[] | [];
  weatherGov_descriptions: WeatherDescriptions[];
  images: WeatherCodeObj[];
}

export const weatherStore = defineStore('weather', {
  state: (): WeatherState => ({
    openmeteo: {} as WeatherState['openmeteo'],
    weatherGov_alerts: [] as WeatherState['weatherGov_alerts'],
    weatherGov_descriptions: [] as WeatherState['weatherGov_descriptions'],
    images: [] as WeatherState['images']
  }),
  getters: {
    current: state => state.openmeteo['current'],
    daily: state => state.openmeteo['daily'],
    periods: state => state.openmeteo['periods'],
    currentDescription: state => state.weatherGov_descriptions[0]['detailedForecast']
  },
  actions: {
    updateImages(res: WeatherState['images']){
      return this.images = res
    },
    updateOpenmeteoRes(res: WeatherState['openmeteo']) {
      return this.openmeteo = res
    },
    updateWeatherGovAlerts(res: WeatherState['weatherGov_alerts']) {
      return this.weatherGov_alerts = res
    },
    updateWeatherGovDescriptions(res: WeatherState['weatherGov_descriptions']) {
      return this.weatherGov_descriptions = res
    },
  }
})
