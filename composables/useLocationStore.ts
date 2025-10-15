export const useLocationStore = () => {

	const {
		createUserLocation,
		getUserPlaceName,
		setUserLocation,
		updateUserLocation,
		handleLocationPermissionsBtn,
		handleSearchSelect,
		getMapboxSearchResponse,
	} = locationStore()

	const {
		UserLocation,
		Locations,
		GeolocationAPI,
		getLocationHistory
	} = storeToRefs(locationStore());

	return {
		UserLocation,
		Locations,
		GeolocationAPI,
		getLocationHistory,
		updateUserLocation,
		handleLocationPermissionsBtn,
		handleSearchSelect,
		createUserLocation,
		getUserPlaceName,
		setUserLocation,
		getMapboxSearchResponse,
	};
};
