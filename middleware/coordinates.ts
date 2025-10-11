export default defineNuxtRouteMiddleware(async (to) => {
    const {
        UserLocation,
    } =  locationStore();
    
    if (to.name === 'weather'){
        return navigateTo({ name: 'weather-coordinates', params: { coordinates: `${UserLocation.latitude},${UserLocation.longitude}` } });
    }

})
