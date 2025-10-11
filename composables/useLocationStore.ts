export const useLocationStore = async () => {

	const {
		createUserLocation,
		getUserPlaceName,
		setUserLocation,
		updateUserLocation,
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
		updateUserLocation,
		createUserLocation,
		getUserPlaceName,
		setUserLocation,
		useSearchAPI: async (query: string) => await locationStore().getMapboxSearchResponse(query)
	};
};
