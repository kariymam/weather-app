export default defineNuxtRouteMiddleware(async () => {
    const {
        setUserLocation,
        updateUserLocation,
    } = locationStore();

    // Get cookie
    const cookie = useCookie('location');
    try {
        const { data } = await useFetch('/api/cookie');
        if (cookie.value !== undefined && data.value) {

            const location = await $fetch(`/api/geolocation/reverse/${data.value.location}`);
            updateUserLocation(location)
            setUserLocation(location)
        }
    } catch (error) {
        console.error('No cookies', error)
    }
})
