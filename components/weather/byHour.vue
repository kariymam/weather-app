<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { WeatherApiResponse } from '~/types';
import '../../styles/temperatures.css';

const { periods, isLoading } = defineProps<{
	periods: WeatherApiResponse['periods'] | undefined;
	isLoading: AsyncDataRequestStatus;
}>();

const temperatureHues = periods?.map(({ temperature2m }) => useMatchTemperatureHues(temperature2m));
</script>

<template>
	<ul
		v-if="isLoading === 'success'"
		id="periodsByDay"
	>
		<li
			v-for="({ temp, cssVariable }, idx) in temperatureHues"
			:key="idx"
		>
			{{ periods![idx] }}
			{{ temp }}
			{{ cssVariable }}
		</li>
	</ul>
</template>
