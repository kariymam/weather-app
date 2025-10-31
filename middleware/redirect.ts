export default defineNuxtRouteMiddleware(() => {
    const {
        getCoordinates,
    } = locationStore();

    return navigateTo({ name: 'weather-coordinates', params: { coordinates: getCoordinates } });
})
