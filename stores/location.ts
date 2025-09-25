import { defineStore } from 'pinia';
import type { Geolocation, GeolocationNavigatorError, MapboxResponseFeature } from '~/types';

export const locationStore = defineStore(
	'location', {
		state: () => ({
			location: {
			/**
          * @default place_name
          */
				place_name: 'New York, New York, United States',
				/**
           * @default coordinates
           * [latitude, longitude]
          */
				coordinates: {
					latitude: 40.730610,
					longitude: -73.935242,
				},
			} as Geolocation,
			geolocationAPI: {
				isError: false,
				error: {} as GeolocationNavigatorError,
				success: false,
			},
			locations: new Set() as Set<Geolocation>,
			error: null as null | unknown,
		}),
		getters: {
			coordinates: state => `${state.location.coordinates.latitude},${state.location.coordinates.longitude}`,
		},
		actions: {
			async getMapboxSearchResponse(query: string) {
				if (query === '' || query === null || query.length < 1) {
					return;
				}
				const features = await $fetch(`/api/geolocation/forward/${query}`);

				return features;
			},
			saveLocationFromMapboxRes(res: MapboxResponseFeature) {
				const { center, place_name } = res;

				const [longitude, latitude] = center;

				this.saveLocation({
					place_name,
					coordinates: { latitude, longitude },
				} as Geolocation);

				weatherStore().saveLocation({
					place_name,
					coordinates: { latitude, longitude },
				} as Geolocation);

				return this.location;
			},
			saveLocation(location: Geolocation) {
				weatherStore().saveLocation(location)
				return this.location = location;
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
						success: false,
					};

					return error;
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

						const { place_name } = await $fetch(`/api/geolocation/reverse/${position.coords.longitude},${position.coords.latitude}`);

						this.saveLocation({
							place_name,
							coordinates: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							},
						} as Geolocation);

						weatherStore().saveLocation({
							place_name,
							coordinates: {
								latitude: position.coords.latitude,
								longitude: position.coords.longitude,
							},
						} as Geolocation);

						return position;
					}
				}
				catch {
					throw new Error('Geolocation API is unavailable');
				}
			},
		},
	});
