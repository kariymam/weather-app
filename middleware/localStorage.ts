import { type IUserLocation } from "~/validators";

export default defineNuxtRouteMiddleware(async (to) => {
    const {
        Locations,
    } = useLocationStore();

    const setLocalStorage = (val: { place_name: string, location: IUserLocation }[]) => window.localStorage.setItem("search", JSON.stringify(val))
    const getLocationHistory = (locationsMap: Map<string, IUserLocation>) => Array.from(locationsMap).map(([place_name, location]) => Object.assign({}, { place_name, location }))

    const storageEnabled = window.localStorage

    const browserHasSupport = () => {
        if (storageEnabled) {

            const localStorageValue = window.localStorage.getItem("search");

            if (localStorageValue !== null) {

                // Parse cookie value into an array of UserLocations
                const parsedValue: { place_name: string, location: IUserLocation }[] = JSON.parse(localStorageValue)

                // Turn array into a Map
                const parsedValueToMap = new Map<string, IUserLocation>(
                    parsedValue.map(
                        ({ place_name, location }) => [place_name, location]
                    )
                )

                const locations = new Map([...Locations.value, ...parsedValueToMap])
                
                // Combine Map with Locations in locationStore()
                console.log(locations)
            }
        } else {
            return
        }
    }
    browserHasSupport()
})
