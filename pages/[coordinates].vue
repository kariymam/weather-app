<script lang="ts" setup>
import type { Geolocation } from '~/types';

definePageMeta({
	validate: async (route) => {
		return typeof route.params.coordinates === 'string' && /-?\d{2,}.\d+,-?\d{2,}.\d+/.test(route.params.coordinates);
	},
});

const { location } = defineProps<{
	location: Geolocation;
}>();

const route = useRoute();

const coordinates = ref(route.params.coordinates);

onBeforeMount(async () => {
	const { data: { value: cookie } } = await useFetch('/api/cookie');

	if (cookie) {
		const parsedCookie = useParseCookieToLocation(cookie.location);
		locationStore().saveLocation(parsedCookie as Geolocation);
	}
});

const { data, status } = await useFetch(`/api/weather/${coordinates.value}`, {
	method: 'post',
	body: {
		data: location,
	},
},
);
</script>

<template>
	<div>
		<weather-by-day
			:daily="data?.daily"
			:is-loading="status"
		/>
		<weather-by-hour
			:periods="data?.periods"
			:is-loading="status"
		/>
	</div>
</template>
