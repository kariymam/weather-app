import type { Geolocation, GeolocationNavigatorError, MapboxResponseFeature } from '~/types';

export const useLocationStore = () => {
	const locationStore = defineStore('location', {
		state: () => ({
			location: {
				/**
				* @default place_name
				* 'New York, New York, United States'
				*/
				place_name: 'New York, New York, United States',
				/**
				 * @default coordinates
				 * [latitude, longitude]
				* [40.730610, -73.935242]
				*/
				coordinates: {
					latitude: 40.730610,
					longitude: -73.935242 
				},
			} as Geolocation,
			geolocationAPI: {
				isError: false,
				error: {} as GeolocationNavigatorError,
				success: false,
			},
			locations: new Set() as Set<Geolocation>,
		}),
		getters: {
			coordinates: (state) => state.location.coordinates,
			coordsString: (state) => `${state.location.coordinates.latitude},${state.location.coordinates.longitude}`
		},
		actions: {
			addToLocationHistory(location: Geolocation) {
				this.locations.add(location);
			},
			async initialize() {
				const { data } = await useFetch(`/api/cookie`);

				if (!data.value || data.value.location === undefined) {
					return;
				}
				else {
					const defaultLocation = useParseCookieToLocation(data.value.location as string) as Geolocation;

					return this.location = defaultLocation;
				}
			},
			async getMapboxSearchResponse(query: string) {
				if (query === '' || query === null || query.length < 1) {
					return;
				}
				const features = await $fetch(`/api/geolocation/forward/${query}`);

				return features;
			},
			saveLocationFromMapboxRes(res: MapboxResponseFeature) {
				const { center, place_name } = res;

				const [longitude, latitude] = center

				const location = {
					place_name,
					coordinates: { latitude, longitude },
				};

				return this.location = location;
			},
			useNavigatorGeolocation() {
				const onSuccess = async (position: GeolocationPosition) => {
					const { latitude, longitude } = position.coords;

					/** Reverse geolocate from coordinates */
					const { place_name } = await $fetch(`/api/geolocation/reverse/${longitude},${latitude}`);

					this.location = {
						place_name,
						coordinates: { latitude, longitude },
					};

					this.geolocationAPI = {
						isError: false,
						error: {} as GeolocationNavigatorError,
						success: true,
					};
				};

				const onError = async (error: GeolocationPositionError) => {
					/**
					 * If the user denies permissions or a timeout occurs
					 * @param error - GeolocationPositionError
					 */

					this.geolocationAPI = {
						isError: true,
						error: {
							message: (error.code === 2) ? 'User position unavailable' : error.message,
							code: error.code,
							name: (error.code === 3) ? 'TIMEOUT' : (error.code === 2) ? 'POSITION_UNAVAILABLE' : 'PERMISSION_DENIED',
						},
						success: false,
					};
				};

				if ('geolocation' in navigator) {
					navigator.geolocation.getCurrentPosition(
						onSuccess,
						onError,
						{
							enableHighAccuracy: false,
							timeout: 5000,
							maximumAge: 1000,
						},
					);
				}
				else {
					throw new Error('Geolocation API is unavailable');
				}

				return this.location;
			},
		},
	},
	);

	locationStore().initialize();

	const { location, coordinates, geolocationAPI: status, locations } = storeToRefs(locationStore());

	return {
		status,
		location,
		locations,
		coordinates,
		coordsString: () => locationStore().coordsString,
		addToLocationHistory: (location: Geolocation) => locationStore().addToLocationHistory(location),
		useGeolocationAPI: () => locationStore().useNavigatorGeolocation(),
		useSearchAPI: async (query: string) => await locationStore().getMapboxSearchResponse(query),
		saveLocationFromMapbox: (res: MapboxResponseFeature) => locationStore().saveLocationFromMapboxRes(res),
	};
};
