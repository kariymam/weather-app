import { defineStore } from 'pinia';
import type { NavigatorGeolocationError } from '~/types';
import { UserLocation, type IUserLocation } from '~/validators';

export const locationStore = defineStore(
	'location', {
		state: () => ({
			UserLocation: {
				place_name: 'New York, New York, United States',
				coordinates: [40.730610,-73.935242],
				latitude: 40.730610,
				longitude: -73.935242,
			} as IUserLocation,
			geolocationAPI: {
				isError: false,
				error: {} as NavigatorGeolocationError,
			},
			Locations: new Map() as Map<string,IUserLocation>,
		}),
		actions: {
			async getMapboxSearchResponse(query: string) {
				if (query === '' || query === null || query.length < 1) {
					return;
				}
				const features = await $fetch(`/api/geolocation/forward/${query}`);

				return features;
			},
			createUserLocation(value: string | string[] | number[]){
				const location = UserLocation(value)
				return location
			},
			updateUserLocation(place_name: string, location: IUserLocation){
				return this.Locations.set(place_name, location)
			},
			async getUserPlaceName(location: IUserLocation){
				if 
				(location.place_name === '')
				{
					const { place_name } = await $fetch(`/api/geolocation/reverse/${location.longitude},${location.latitude}`);
					location.place_name = place_name;
				} 
				else if 
				(location.place_name && this.Locations.has(location.place_name))
				{
					const newLocation = this.Locations.get(location.place_name)
					if(newLocation) {
						location = newLocation
					}
				}
				return location;
			},
			setUserLocation(location: IUserLocation) {
				return this.UserLocation = location
			},
			async useNavigatorGeolocation() {
				const onError = async (error: GeolocationPositionError) => {
					this.geolocationAPI = {
						isError: true,
						error: {
							message: (error.code === 2) ? 'User position unavailable' : error.message,
							code: error.code,
							name: (error.code === 3) ? 'TIMEOUT' : (error.code === 2) ? 'POSITION_UNAVAILABLE' : 'PERMISSION_DENIED',
						},
					};

					return error.message;
				};

				try {
					if ('geolocation' in navigator) {
						const position = await new Promise<GeolocationPosition>(resolve => navigator.geolocation.getCurrentPosition(
							resolve,
							onError,
							{
								enableHighAccuracy: false,
								timeout: 5000,
								maximumAge: 1000,
							},
						));

						return `${position.coords.latitude},${position.coords.longitude}`;
					}
				}
				catch {
					throw new Error('Geolocation API is unavailable');
				}
			},
		},
	});
