export const useLocationStore = async () => {

	const {
		createUserLocation,
		getUserPlaceName,
		setUserLocation,
	} = locationStore()

	const {
		UserLocation,
		Locations,
		geolocationAPI
	} = storeToRefs(locationStore());

	return {
		UserLocation,
		Locations,
		geolocationAPI,
		createUserLocation,
		getUserPlaceName,
		setUserLocation,
		useSearchAPI: async (query: string) => await locationStore().getMapboxSearchResponse(query)
	};
};
