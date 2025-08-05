<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { Geolocation, WeatherApiResponse } from '~/types';

definePageMeta({
	validate: async (route) => {
		return typeof route.params.coordinates === 'string' && /-?\d{2,}.\d+,-?\d{2,}.\d+/.test(route.params.coordinates);
	},
});

onBeforeMount(async () => {
	const { data: { value: cookie } } = await useFetch('/api/cookie');

	if (cookie) {
		const parsedCookie = useParseCookieToLocation(cookie.location);
		locationStore().saveLocation(parsedCookie as Geolocation);
	}
});

const { location, forecast } = defineProps<{
	location: Geolocation;
	forecast: { forecast: WeatherApiResponse | null, status: AsyncDataRequestStatus };
}>();

</script>

<template>
	<div>
		<ui-hero
			:status="forecast.status"
		>
			<template #heading>
				Right now in {{ location.place_name }}...
			</template>
			<template #subtitle>
				<h3 v-if="forecast.forecast?.current">
					{{ Math.floor(forecast.forecast?.current.temperature2m) }}
				</h3>
			</template>
			<template #forecast="{ isLoading }">
				<div class="container">
					<ul
						v-if="forecast.forecast?.periodsByDay"
						id="periodsByDay"
					>
						<weather-by-day
							v-for="(weekday, idx) in forecast.forecast?.periodsByDay"
							:key="idx"
							:period="weekday"
							:idx="idx"
							:is-loading="isLoading"
						/>
					</ul>
				</div>
			</template>
		</ui-hero>
	</div>
</template>
