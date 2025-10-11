import { locationStore } from '~/stores/location'

export function useLocationActions() {
  const {
    createUserLocation,
    useNavigatorGeolocation,
    updateUserLocation,
    setUserLocation,
    getUserPlaceName,
  } = locationStore()

  const route = useRoute()

  const handleLocationPermissionsBtn = async () => {
    const results = await useNavigatorGeolocation()
    if 
    (results) {

      const location = setUserLocation(
        await getUserPlaceName(createUserLocation(String(results)))
      )
      
      useSetCookie(location)
      updateUserLocation(location.place_name, location)

      if (route.params.coordinates) {
        navigateTo({ name: 'weather-coordinates', params: { coordinates: `${location.latitude},${location.longitude}` } })
      }

    }
  }

  const handleSearchSelect = async (res: any) => {
    if (res) {
      const [long, lat] = res.center
      const newUserLocation = createUserLocation([lat, long])

      updateUserLocation(res.place_name, newUserLocation)

      if 
      (route.params.coordinates) {
        navigateTo({ name: 'weather-coordinates', params: { coordinates: `${newUserLocation.latitude},${newUserLocation.longitude}` } })
      }

    } else {
      throw Error('No mapbox response')
    }
  }

  return {
    handleLocationPermissionsBtn,
    handleSearchSelect,
  }
}