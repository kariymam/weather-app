import type { MapboxResponse } from '~/types';

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);

  const { search } = getRouterParams(event);

	const { features } = await $fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?proximity=ip&access_token=${config.mpbx}`) as MapboxResponse;

	return features;
});
