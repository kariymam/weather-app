<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { WeatherApiResponse } from '~/types';
import '../../styles/temperatures.css';

const { daily, isLoading } = defineProps<{
	daily: WeatherApiResponse['daily'] | undefined;
	isLoading: AsyncDataRequestStatus;
}>();

</script>

<template>
	<h2>The week ahead</h2>
	<div
		v-if="isLoading === 'success'"
		id="periodsByDay"
		ref="periodByDay"
	>
		<div
			v-for="({ time, weather_code, precipitation_probability_max, temperature_2m_max, temperature_2m_min }, idx) in daily"
			:key="idx"
		>
			<WeatherDay>
				<template #weekday>
					{{ useFormatDate(time, 'eee') }}
				</template>
				<template #date>
					{{ useFormatDate(time) }}
				</template>
				<template #weather-code>
					<weather-code :code="weather_code" />
				</template>
				<template #high-temperature>
					{{ Math.round(temperature_2m_max) }}°
				</template>
				<template #low-temperature>
					{{ Math.round(temperature_2m_min) }}°
				</template>
				<template v-if="precipitation_probability_max > 20" #precipitation>
					<v-chip 
					prepend-icon="mdi-weather-rainy"
					aria-label="Probability of precipitation" role="img" aria-hidden="false">
					{{ precipitation_probability_max }}%
					</v-chip>
				</template>
			</WeatherDay>
		</div>
	</div>
</template>
<style lang="css">
#periodsByDay {
	--column-gap: 1rem;
	--row-gap: 1rem;
	--grid: auto / auto auto;

	display: grid;
	grid-template: var(--grid);
	column-gap: var(--column-gap);
	row-gap: var(--row-gap);
	padding: 1rem 2rem;
}


@media screen and (width >= 900px) {
	#periodsByDay {
		--column-gap: 1.2rem;
		--row-gap: 0;
		--grid: auto 1fr / repeat(7, auto);

		grid-auto-flow: row;
		overflow-x: scroll;
	}
}
</style>
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
