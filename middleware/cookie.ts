export default defineNuxtRouteMiddleware(async () => {
    const {
        getUserPlaceName,
        createUserLocation,
        setUserLocation,
        updateUserLocation,
    } = useLocationStore();

    // Get cookie
    const cookie = useCookie('location');
    try {
        const { data } = await useFetch('/api/cookie');
        if (cookie.value !== undefined && data.value) {

            // Create a user location object from the cookie string value
            const parsedCookie = createUserLocation(data.value.location);

            // Update the location object with a place_name
            const location = await getUserPlaceName(parsedCookie)

            // Add the saved UserLocation to the Locations Map and set to User Location
            updateUserLocation(location)
            setUserLocation(location)
        }
    } catch (error) {
        console.error('No cookies', error)
    }
})
