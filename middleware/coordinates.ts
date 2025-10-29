export default defineNuxtRouteMiddleware(async (to) => {
    const {
        UserLocation,
    } = useLocationStore();

    const response = await $fetch(`/api/geolocation/reverse/${to.params.coordinates}`);

    if (response.place_name) {
        UserLocation.value = response
        // Locations.value = new Map([...Locations.value, [response.place_name, response]])
    }

})
