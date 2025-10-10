export default defineNuxtRouteMiddleware(async (to) => {

    const {
        coordinates
    } = await useLocationStore();

    if (to.path === '/weather') {
        if (!coordinates.value) {
            return '/weather/';
        } else {
            return navigateTo({ name: 'weather-coordinates', params: { coordinates: coordinates.value } });
        }
    }
})
