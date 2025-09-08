<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { openmeteoDay, openmeteoPeriod, WeatherDescriptions } from '~/types';

const { weather } = defineProps<{
	coordinates: string
	weather: {
		data: {
			coordinates: string[];
			current: {
				time: string;
				precipitation: number;
				temperature2m: number;
				isDay: number;
				apparentTemperature: number;
			}
			periods: openmeteoPeriod[];
			daily: openmeteoDay[];
			descriptions: WeatherDescriptions[];
		},
		status: AsyncDataRequestStatus,
		// @ts-ignore -- Can't find type
		refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
	}
}>();


</script>

<template>
	<div>
		{{ weather.status }}
		{{ weather.data }}
	</div>
</template>
