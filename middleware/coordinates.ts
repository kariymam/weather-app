

export default defineNuxtRouteMiddleware(async (to, from) => {
    const {
        setUserLocation,
        updateUserLocation,
    } = useLocationStore();

    if(import.meta.server && 
        (to.name === 'weather-coordinates' || from.name !== 'weather')
    ){
        const location = await $fetch(`/api/geolocation/reverse/${to.params.coordinates}`);
        updateUserLocation(location)
        setUserLocation(location)
    }

    if (import.meta.client) {
        return
    }

})
