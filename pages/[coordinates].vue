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

const { weatherData } = defineProps<{
	location: Geolocation;
	weatherData: {
		forecast: WeatherApiResponse | null;
		status: AsyncDataRequestStatus;
	};
}>();
</script>

<template>
	<div>
		<ui-hero
			:status="weatherData.status"
		>
			<template #heading>
				Weather
			</template>
			<template #subtitle>
					Right now...
			</template>
			<template #forecast="{ isLoading }">
				<div class="container">
					{{ weatherData.forecast?.periods }}
					<ul
						v-if="weatherData.forecast?.periods"
						id="periodsByDay"
					>
						<weather-by-day
							v-for="(weekday, idx) in weatherData.forecast?.periods"
							:key="idx"
							:period="weekday"
							:idx="idx"
							:is-loading="isLoading"
						/>
					</ul>
				</div>
			</template>
			<template #default>
				<p>{{ weatherData.forecast?.current.temperature2m &&Math.floor(weatherData.forecast?.current.temperature2m) }}</p>
			</template>
		</ui-hero>
	</div>
</template>
