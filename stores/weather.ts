import { defineStore } from 'pinia'
import type { WeatherAPIResponse } from '~/types'

export const weatherStore = defineStore('weather', {
  state: () => ({ 
			weather: {} as WeatherAPIResponse["weather"]["data"]    
  }),
  getters: {
    currentWeatherDescription: state => state.weather.descriptions.shift()
  },
  actions: {
    saveWeatherData(weather: WeatherAPIResponse["weather"]["data"]){
      return this.weather = weather
    }
  }
})
