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

	const route = useRoute()

	if (route.fullPath === '/') {
		const cookie = useCookie('location');
	
		try {
			const { data } = await useFetch('/api/cookie');
			
			if (cookie.value !== undefined && data.value) {
				const parsedCookie = createUserLocation(data.value.location);
				const location = await getUserPlaceName(parsedCookie)
				setUserLocation(location)
			}
		} catch (error) {
			console.log(error)
		}
	}


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
