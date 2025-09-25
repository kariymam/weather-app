<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { WeatherApiResponse, WeatherDescriptions } from '~/types';
import '../../styles/temperatures.css';

const { daily, descriptions, status } = defineProps<{
	daily: WeatherApiResponse['daily'] | undefined;
	descriptions: WeatherDescriptions[] | undefined;
	status: AsyncDataRequestStatus;
}>();

const images: Ref<ImageObj[] | undefined[]> = await useGetWeatherCodes(daily)

const imageAttributes = (obj: ImageObj, string: string) => {
	return string === "day" ? obj.day : string === "night" ? obj.night : obj.day
}

const observer = useTemplateRef('observer')

const firstElem: Ref<HTMLDivElement | null> = ref(null)

const lastElem: Ref<HTMLDivElement | null> = ref(null)

onMounted(() => {

	if (observer.value) {
		firstElem.value = observer.value[0]
		lastElem.value = observer.value[observer.value.length - 1]
	
		if (firstElem && lastElem) {
	
			const ob = (el: HTMLDivElement) => {
				const io = new IntersectionObserver((entries) => entries.forEach(entry => console.log(entry)))
				io.observe(el)
			}
	
			ob(firstElem.value)
			ob(lastElem.value)
		}
	}


})

</script>

<template>
	<div
		id="periodsByDay"
		ref="periodByDay"
		class="gradient"
	>
	<div
	v-for="({ time, precipitation_probability_max, temperature_2m_max, temperature_2m_min }, idx) in daily"
	:key="idx"
	class="day"
	ref="observer"
	>
			<WeatherDay>
				<template #weekday>
					{{ useFormatDate(time, 'eee') }}
				</template>
				<template v-if="idx === 0 || idx === 6" #date>
					{{ useFormatDate(time) }}
				</template>
				<template #weather-code>
					 <WeatherCode v-if="images[idx] && Object.hasOwn(images[idx], 'day')" :code="imageAttributes(images[idx], 'day')" />
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
					<span class="probability">
						<v-icon size="x-small" icon="mdi-weather-rainy"></v-icon>
						{{ precipitation_probability_max }}%
					</span>
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
		border-radius: 4px;
		backdrop-filter: blur(10px);
		display: flex;
		flex-flow: column nowrap;
		div {
			height: 100%;
			display: flex;
		}
	}
}

.high > span, 
.low > span,
.probability {
	font-size: var(--font-size-smallest);
}

#periodsByDay.gradient::after {
	content: '';
	display: flex;
	background-image: radial-gradient();
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