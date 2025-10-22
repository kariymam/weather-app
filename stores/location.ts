import { defineStore } from 'pinia';
import type { MapboxResponseFeature, NavigatorGeolocationError } from '~/types';
import { UserLocation, type IUserLocation } from '~/validators';

export interface LocationState {
	UserLocation: IUserLocation;
	GeolocationAPI: NavigatorGeolocationError;
	Locations:  Map<string, IUserLocation>;
}

export const locationStore = defineStore(
	'location', {
	state: (): LocationState => ({
		UserLocation: {
			place_name: 'New York, New York, United States',
			coordinates: [40.730610, -73.935242],
			latitude: 40.730610,
			longitude: -73.935242,
		} as IUserLocation,
		GeolocationAPI: {} as NavigatorGeolocationError,
		Locations: new Map() as Map<string, IUserLocation>,
	}),
	getters: {
		getLocationHistory: (state) => Array.from(state.Locations),
		getCoordinates: (state) => state.UserLocation.coordinates.join(',')
	},
	actions: {
		createUserLocation(value?: string | string[] | number[], place_name?: string) {
			let location = {} as IUserLocation
			if (value) {
				location = UserLocation(value)
			}
			if (place_name) {
				location.place_name = place_name
			}
			return location
		},
		updateUserLocation(location: IUserLocation, place_name = location.place_name,) {
			return this.Locations.set(place_name, location)
		},
		setUserLocation(location: IUserLocation) {
			return this.UserLocation = location
		},
		async handleSearchSelect(res: MapboxResponseFeature) {
			if (res) {
				const [long, lat] = res.center
				const _location = this.createUserLocation([lat, long], res.place_name)
				this.setUserLocation(_location)
				this.updateUserLocation(_location)
			} else {
				console.error('No mapbox response')
			}
			return res
		},
		async handleLocationPermissionsBtn(locations: [string, IUserLocation][]) {
			let results = async () => await this.useNavigatorGeolocation().then(async (res) => {
				const response = await $fetch(`/api/geolocation/reverse/${res}`);
				return response
			}).catch((error) => {
				if (error) {
					console.error(error)
				}
				return {} as IUserLocation
			})

			const location = await results()

			if (location.place_name !== ''){
				this.setUserLocation(location)
				this.updateUserLocation(location)
			}

			return location
		},
		async getMapboxSearchResponse(query: string) {
			if (query === '' || query === null || query.length < 1) {
				return;
			}
			const features = await $fetch(`/api/geolocation/forward/${query}`);
			return features;
		},
		async useNavigatorGeolocation() {
			const onError = async (error: GeolocationPositionError) => {
				this.GeolocationAPI = {
					name: (error.code === 3) ? 'TIMEOUT' : (error.code === 2) ? 'POSITION_UNAVAILABLE' : 'PERMISSION_DENIED',
					code: error.code,
					message: (error.code === 2) ? 'User position unavailable' : error.message
				}

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
