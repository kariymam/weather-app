<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { Geolocation, WeatherApiResponse } from '~/types';

const { location, forecast } = defineProps<{
	location: Geolocation;
	forecast: { forecast: WeatherApiResponse | null, status: AsyncDataRequestStatus };
}>();

</script>

<template>
	<div>
		{{ location.place_name }}
		{{ forecast.status }}
		{{ forecast.forecast }}
	</div>
</template>
