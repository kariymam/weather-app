import { type IUserLocation } from "~/validators";

export default defineNuxtRouteMiddleware(async (to) => {
    const {
        Locations,
    } = useLocationStore();

    const getLocalStorage = () => window.localStorage.getItem("search")
    const setLocalStorage = (val: { place_name: string, location: IUserLocation }[]) => window.localStorage.setItem("search", JSON.stringify(val))
    const getLocationHistory = (locationsMap: Map<string, IUserLocation>) => Array.from(locationsMap).map(([place_name, location]) => Object.assign({}, { place_name, location }))

    if (
        import.meta.browser && to.name === 'weather-coordinates' 
        || import.meta.browser && to.name === 'index'
    ) {
        const storageEnabled = window.localStorage

        const browserHasSupport = () => {
            if (storageEnabled) {
                const localStorageValue = getLocalStorage();
                if (localStorageValue !== null) {

                    // Parse cookie value into an array of UserLocations
                    const parsedValue: { place_name: string, location: IUserLocation }[] = JSON.parse(localStorageValue)

                    // Turn array into a Map
                    const parsedValueToMap = new Map<string, IUserLocation>(
                        parsedValue.map(
                            ({ place_name, location }) => [place_name, location]
                        )
                    )

                    // Combine Map with Locations in locationStore()
                    if(parsedValueToMap.size >= Locations.value.size){
                        return Locations.value = new Map([...Locations.value, ...parsedValueToMap])
                    }
                }
            const locationStore_history = getLocationHistory(Locations.value)
            setLocalStorage(locationStore_history)
            } else {
                return
            }
        }
        browserHasSupport()
    } 
})
