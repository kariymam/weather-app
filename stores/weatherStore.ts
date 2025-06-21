interface navigatorError {
	name: string;
	code: number;
	message: string;
}

interface UserLocation {
	location: {
		place_name: string | undefined;
		coordinates: number[];
	};
	navigatorError: [boolean, navigatorError?];
}

export const useWeatherStore = defineStore('weather', {
	state: (): UserLocation => ({
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
			coordinates: [40.730610, -73.935242],
		},
		navigatorError: [false],
	}),
	getters: {
		coordinatesForGeolocation: (state) => {
			const [latitude, longitude] = state.location.coordinates;
			return `${longitude},${latitude}`;
		},
		coordinatesForWeatherData: (state) => {
			const [latitude, longitude] = state.location.coordinates;
			return `${latitude},${longitude}`;
		}
	},
	actions: {
		savePlaceName(place_name: string) {
			this.location.place_name = place_name;
			return place_name;
		},
		saveLocation(location: {
			place_name: string | undefined;
			coordinates: number[];
		}) {
			this.location = location;
			return location;
		},
		useNavigatorGeolocation() {
			const onSuccess = async (position: GeolocationPosition) => {

				const { latitude, longitude } = position.coords;
				this.location.coordinates = [latitude, longitude];

				const coordinates = this.coordinatesForGeolocation

				/** Reverse geolocate (and eventually fetch weather data) from coordinates */
				const { place_name } = await $fetch(`/api/geolocation/reverse/${coordinates}`);
				this.location.place_name = place_name

			};

			const onError = (error: GeolocationPositionError) => {
				/**
                 * If the user denies permissions, their location is unavailable
                 * @param error - GeolocationPositionError
                 */

				return {
					message: (error.code === 2) ? 'User position unavailable' : error.message,
					code: error.code,
					name: (error.code === 3) ? 'TIMEOUT' : (error.code === 2) ? 'POSITION_UNAVAILABLE' : 'PERMISSION_DENIED',
				};
			};

			if ('geolocation' in navigator) {
				navigator.geolocation.getCurrentPosition(
					onSuccess,
					(error) => {
						const navigatorErr = onError(error);
						this.navigatorError[0] = true;
						this.navigatorError.push(navigatorErr);
					},
					{
						enableHighAccuracy: false,
						timeout: 5000,
						maximumAge: 1000,
					},
				);
			}
			else {
				this.navigatorError[0] = true;
				this.navigatorError.push({
					name: 'Geolocation is unavailable',
					code: 0,
					message: 'Geolocation is not available in this browser',
				});
			}
			return;
		},
	},
},
);
