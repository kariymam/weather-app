export default defineNuxtRouteMiddleware(async (to, from) => {
    const {
        UserLocation,
        getUserPlaceName,
        createUserLocation,
        updateUserLocation,
    } =  await useLocationStore();

    const cookie = useCookie('location');

    try {
        const { data } = await useFetch('/api/cookie');
        
        if (cookie.value !== undefined && data.value) {
            const parsedCookie = createUserLocation(data.value.location);
            const location = await getUserPlaceName(parsedCookie)
            updateUserLocation(location.place_name, location)
        }
    } catch (error) {
        console.log(error)
    }

    if (to.name === 'weather-coordinates'){
        const location = await getUserPlaceName(createUserLocation(to.params.coordinates))
		UserLocation.value = location
    }
    
    if (to.name === 'weather'){
        return navigateTo({ name: 'weather-coordinates', params: { coordinates: `${UserLocation.value.latitude},${UserLocation.value.longitude}` } });
    }

})
