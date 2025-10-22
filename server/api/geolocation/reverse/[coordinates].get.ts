import type { MapboxResponse } from '~/types';
import { UserLocation } from '~/validators';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const { coordinates } = getRouterParams(event);
	const location = UserLocation(coordinates)

	const { features } = await $fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?types=place&access_token=${config.mpbx}`) as MapboxResponse;

	 if (features.length){
        const [results] = features
        location.place_name = results.place_name
    }

	return location

})