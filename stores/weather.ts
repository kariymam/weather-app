import { defineStore } from 'pinia'
import type { Geolocation, WeatherAPIResponse } from '~/types'

export const weatherStore = defineStore('weather', {
  state: () => ({ 
      location: {} as Geolocation,
			weather: {} as WeatherAPIResponse["weather"]["data"]    
  }),
  getters: {
    currentWeatherDescription: state => state.weather.descriptions.shift()
  },
  actions: {
    saveLocation(location: Geolocation) {
      return this.location = location;
    },
    saveWeatherData(weather: WeatherAPIResponse["weather"]["data"]){
      return this.weather = weather
    }
  }
})
