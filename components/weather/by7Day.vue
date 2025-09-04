<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { WeatherApiResponse, WeatherDescriptions } from '~/types';
import '../../styles/temperatures.css';

const { daily, descriptions, isLoading } = defineProps<{
	daily: WeatherApiResponse['daily'] | undefined;
	descriptions: WeatherDescriptions[] | undefined;
	isLoading: AsyncDataRequestStatus;
}>();

</script>

<template>
	<div
		v-if="isLoading === 'success'"
		id="periodsByDay"
		ref="periodByDay"
	>
		<div
			v-for="({ time, weather_code, precipitation_probability_max, temperature_2m_max, temperature_2m_min }, idx) in daily"
			:key="idx"
			class="day"
		>
			<WeatherDay>
				<template #weekday>
					{{ useFormatDate(time, 'eee') }}
				</template>
				<template v-if="idx === 0 || idx === 6" #date>
					{{ useFormatDate(time) }}
				</template>
				<template #weather-code>
					<weather-code :code="weather_code" />
				</template>
				<template v-if="descriptions" #description>
					<p>{{ descriptions[idx].short }}</p>
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
	--grid: auto / auto;

	display: grid;
	grid-template: var(--grid);
	column-gap: var(--column-gap);
	row-gap: var(--row-gap);
	padding: var(--padding);

	> .day:last-child > span.date {
		margin-left: auto;
	}

	> .day {
		display: flex;
		flex-flow: column nowrap;
	}

	> .day span.date {
		margin: 0 0 var(--row-gap) 0;
	}

}


@media screen and (width >= 900px) {
	#periodsByDay {
		--column-gap: 1.2rem;
		--row-gap: 0;
		--grid: auto 1fr / repeat(7, auto);

		grid-auto-flow: row;
		overflow-x: scroll;

		> .day {
			flex-flow: column-reverse nowrap;
		}

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
