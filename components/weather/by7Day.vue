<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { WeatherApiResponse, WeatherDescriptions } from '~/types';
import '../../styles/temperatures.css';

const { daily, descriptions, isLoading } = defineProps<{
	daily: WeatherApiResponse['daily'] | undefined;
	descriptions: WeatherDescriptions[] | undefined;
	isLoading: AsyncDataRequestStatus;
}>();

type ImageObj = {
	day: {
        description: string;
        image: string;
    };
    night: {
        description: string;
        image: string;
    }
}

const images: Ref<ImageObj[] | undefined[]> = ref([])

const promises = async () => {
	const arr: ImageObj[] = []
	if (daily){
		for (const obj of daily) {
			const code = await $fetch(`/api/weather/codes/${obj["weather_code"]}`)

			if(code) {
				arr.push(code)
			}
		}
	}
	return images.value = arr
}

await promises()

const imageAttributes = (obj: ImageObj) => {
	return obj.day
}

</script>

<template>
	<div
		id="periodsByDay"
		ref="periodByDay"
	>
		<div
			v-for="({ time, precipitation_probability_max, temperature_2m_max, temperature_2m_min }, idx) in daily"
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
					 <WeatherCode v-if="images[idx] && Object.hasOwn(images[idx], 'day')" :code="imageAttributes(images[idx])" />
				</template>
				<template v-if="descriptions" #description>
					<p>{{ descriptions[idx].shortForecast }}</p>
				</template>
				<template #high-temperature>
					<span>H</span>
					{{ Math.round(temperature_2m_max) }}
				</template>
				<template #low-temperature>
					<span>L</span>
					{{ Math.round(temperature_2m_min) }}
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
	--font-size-smallest: 0.75rem;

	display: grid;
	grid-template: var(--grid);
	column-gap: var(--column-gap);
	row-gap: var(--row-gap);
	padding: var(--padding);

	> .day {
		display: flex;
		flex-flow: column nowrap;
		div {
			height: 100%;
		}
	}
}

.high > span, 
.low > span {
	font-size: var(--font-size-smallest);
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
