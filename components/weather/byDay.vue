<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { WeatherApiResponse } from '~/types';
import '../../styles/temperatures.css';

const { daily, isLoading } = defineProps<{
	daily: WeatherApiResponse['daily'] | undefined;
	isLoading: AsyncDataRequestStatus;
}>();

const weather_codes = useGetWeatherIcon(daily)

</script>

<template>
	<div
		v-if="isLoading === 'success'"
		id="periodsByDay"
	>
		<div
			v-for="({ time, temperature_2m_max, temperature_2m_min }, idx) in daily"
			:key="idx"
		>
			<weather-day>
				<template #weekday="{ format }">
					{{ format(time) }}
				</template>
				<template #date="{ format }">
					{{ format(time) }}
				</template>
				<template #weather-code>
					<weather-code v-if="weather_codes" :code="weather_codes![idx]"/>
				</template>
				<template #high-temperature>
					{{ Math.round(temperature_2m_max) }}
				</template>
				<template #low-temperature>
					{{ Math.round(temperature_2m_min) }}
				</template>
			</weather-day>
		</div>
	</div>
</template>
<!--
	time: string;
    weather_code: number;
    temperature_2m_max: number;
    apparent_temperature_max: number;
    temperature_2m_min: number;
    apparent_temperature_min: number;
    precipitation_probability_max: number;
    precipitation_hours: number;

-->
