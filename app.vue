<script setup lang="ts">
import type { WeatherApiResponse } from './types';

const {
	location,
	coordinates,
} = await useLocationStore();

const { data: forecast, status } = await useAsyncData(
	'weather',
	() => $fetch<WeatherApiResponse>(`/api/weather/${coordinates.value}`),
	{ watch: [coordinates] },
);
</script>

<template>
	<NuxtLayout>
		<NuxtPage
			:location="location"
			:forecast="{ forecast, status }"
		/>
	</NuxtLayout>
</template>
