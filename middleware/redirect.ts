export default defineNuxtRouteMiddleware(() => {
    const {
        UserLocation,
    } = useLocationStore();

    const coordinates = UserLocation.value.coordinates.join(',')
    return navigateTo({ name: 'weather-coordinates', params: { coordinates } });
})
