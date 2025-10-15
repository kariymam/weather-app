import type { IUserLocation } from "~/validators";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const {
        UserLocation,
        getUserPlaceName,
        createUserLocation,
    } = useLocationStore();

    const currentLocation = async (location: IUserLocation) => {
        location = await getUserPlaceName(location)
        return location
    }

    const location = await currentLocation(createUserLocation(to.params.coordinates))
    UserLocation.value = location
})
