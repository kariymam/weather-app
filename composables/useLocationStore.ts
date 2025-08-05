import type { Geolocation, MapboxResponseFeature } from '~/types';

export const useLocationStore = async () => {

	const {
		location,
		geolocationAPI,
		locations,
		coordinates,
	} = storeToRefs(locationStore());

	const cookie = useCookie('location');

	const { data } = await useFetch('/api/cookie');

	if (cookie.value !== undefined && data.value) {
		const parsedCookie = useParseCookieToLocation(data.value.location);
		locationStore().saveLocation(parsedCookie as Geolocation)
	}

	return {
		geolocationAPI,
		location,
		locations,
		coordinates,
		saveLocation: (location: Geolocation) => locationStore().saveLocation(location),
		useGeolocationAPI: () => locationStore().useNavigatorGeolocation(),
		useSearchAPI: async (query: string) => await locationStore().getMapboxSearchResponse(query),
		saveLocationFromMapbox: (res: MapboxResponseFeature) => locationStore().saveLocationFromMapboxRes(res),
	};
};
