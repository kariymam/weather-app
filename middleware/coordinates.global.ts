export default defineNuxtRouteMiddleware(async (to, from) => {
    const {
        UserLocation,
        Locations,
        getLocationHistory,
        getUserPlaceName,
        createUserLocation,
        updateUserLocation,
    } =  await useLocationStore();

    // Get cookie
    const cookie = useCookie('location');

    try {
        const { data } = await useFetch('/api/cookie');
        
        if (cookie.value !== undefined && data.value) {
            // Create a user location object from the cookie string value
            const parsedCookie = createUserLocation(data.value.location);

            // Update the location object with a place_name
            const location = await getUserPlaceName(parsedCookie)

            // Add the saved UserLocation to the Locations Map
            updateUserLocation(location.place_name, location)
        }
    } catch (error) {
        console.log(error)
    }

    if (Locations.value.size === 1){
        UserLocation.value = getLocationHistory.value[0][1]
    }


    if (to.name === 'weather-coordinates'){
        const location = await getUserPlaceName(createUserLocation(to.params.coordinates))
		UserLocation.value = location
    }
    
    if (to.name === 'weather'){
        return navigateTo({ name: 'weather-coordinates', params: { coordinates: `${UserLocation.value.latitude},${UserLocation.value.longitude}` } });
    }

})
