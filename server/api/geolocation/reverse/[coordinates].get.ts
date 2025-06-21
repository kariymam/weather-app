import type { MapboxResponse } from '~/types';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

	const { coordinates } = getRouterParams(event);

	const { features } = await $fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates}.json?types=place&access_token=${config.mpbx}`) as MapboxResponse;

  console.log(features)

	const [results] = features;

	return {
		place_name: results.place_name,
	};
});
