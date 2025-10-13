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
		geolocationAPI,
		getLocationHistory
	} = storeToRefs(locationStore());

	return {
		UserLocation,
		Locations,
		geolocationAPI,
		getLocationHistory,
		updateUserLocation,
		createUserLocation,
		getUserPlaceName,
		setUserLocation,
		useSearchAPI: async (query: string) => await locationStore().getMapboxSearchResponse(query)
	};
};
