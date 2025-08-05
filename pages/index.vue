<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { Geolocation, WeatherApiResponse } from '~/types';

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
				Home
			</template>
			<template #subtitle>
				A subtitle goes here
			</template>
			<template #default>
				Hello
			</template>
		</ui-hero>
	</div>
</template>
