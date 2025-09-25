import { defineStore } from 'pinia'
import type { Geolocation, WeatherAPIResponse } from '~/types'

export const weatherStore = defineStore('weather', {
  state: () => ({ 
      location: {} as Geolocation,
			weather: {} as unknown    
  }),
  actions: {
    saveLocation(location: Geolocation) {
      return this.location = location;
    },
    saveWeatherData(weather: unknown){
      return this.weather = weather
    }
  }
})
