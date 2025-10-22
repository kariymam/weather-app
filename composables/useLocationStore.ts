export const useLocationStore = () => {

	const {
		createUserLocation,
		setUserLocation,
		updateUserLocation,
		handleLocationPermissionsBtn,
		handleSearchSelect,
		getMapboxSearchResponse,
	} = locationStore()

	const {
		UserLocation,
		Locations,
		getCoordinates,
		GeolocationAPI,
		getLocationHistory
	} = storeToRefs(locationStore());

	return {
		UserLocation,
		Locations,
		GeolocationAPI,
		getLocationHistory,
		getCoordinates,
		updateUserLocation,
		handleLocationPermissionsBtn,
		handleSearchSelect,
		createUserLocation,
		setUserLocation,
		getMapboxSearchResponse,
	};
};
