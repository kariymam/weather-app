<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { WeatherApiResponse, WeatherDescriptions } from '~/types';
import '../../styles/temperatures.css';
import { attachObservers } from '~/utils';
import { format } from 'date-fns';

const { daily, descriptions, status } = defineProps<{
	daily: WeatherApiResponse['daily'] | undefined;
	descriptions: WeatherDescriptions[] | undefined;
	status: AsyncDataRequestStatus;
}>();

// ---- Images

const images: Ref<ImageObj[] | undefined[]> = await useGetWeatherCodes(daily)
const imageAttributes = (obj: ImageObj, string: string) => {
	return string === "day" ? obj.day : string === "night" ? obj.night : obj.day
}

// ---- Scroll indicator

const target = useTemplateRef('observerRef');
const firstElemObserverEntry: Ref<IntersectionObserverEntry | null> = ref(null);
const lastElemObserverEntry: Ref<IntersectionObserverEntry | null> = ref(null);
const firstElemIsVisible = ref(false);
const lastElemIsVisible = ref(false);


onMounted(() => {
	if (target.value) {
		/**
		 * Is the list of elements
		 * @param target array of HTML Elements,
		 * @param ref is an array of refs
		 */

		attachObservers(useGetElement(target.value, [0, 6]), [firstElemObserverEntry, lastElemObserverEntry])

		if (firstElemObserverEntry && lastElemObserverEntry) {

			watch(firstElemObserverEntry, (newVal) => {
				if(newVal){
					firstElemIsVisible.value = newVal?.isIntersecting
				}
			})
	
			watch(lastElemObserverEntry, (newVal) => {
				if (newVal) {
					lastElemIsVisible.value = newVal?.isIntersecting
				}
			})
		}
	}
})
// ----

</script>

<template>

	<div
		id="periodsByDay"
		ref="periodByDay"
		:class="[ firstElemIsVisible && !lastElemIsVisible ? 'scroll-indicator-right' : !firstElemIsVisible && lastElemIsVisible ? 'scroll-indicator-left' : '']"
	>
	<div
	v-for="({ time, precipitation_probability_max, temperature_2m_max, temperature_2m_min }, idx) in daily"
	:key="idx"
	class="day"
	ref="observerRef"
	>
			<WeatherDay>
				<template #weekday>
					{{ idx === 0 ? 'Today' : format(time, 'eee') }}
				</template>
				<template v-if="idx === 0 || idx === 6" #date>
					{{ format(time, 'eee') }}
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
	--scroll-shadow-left: no-repeat left/ 20% radial-gradient(circle at left, rgba(0, 0, 0, 0.2), transparent);
	--scroll-shadow-right: no-repeat right/ 20% radial-gradient(circle at right, rgba(0, 0, 0, 0.2), transparent);

	display: grid;
	grid-template: var(--grid);
	column-gap: var(--column-gap);
	row-gap: var(--row-gap);
	padding: var(--padding);
	position: relative;
	background: var(--scroll-shadow-left),
	var(--scroll-shadow-right);
	transition-property: background;

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

#periodsByDay.scroll-indicator-left {
	background: var(--scroll-shadow-left);
}

#periodsByDay.scroll-indicator-right {
	background: var(--scroll-shadow-right);
}


@media screen and (width >= 900px) {
	#periodsByDay {
		--column-gap: 1.2rem;
		--row-gap: 0;
		--grid: auto 1fr / repeat(7, auto);

		grid-auto-flow: row;
		overflow-x: scroll;
		overflow-y: none;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scroll-snap-align: start end;
		scroll-snap-stop: always;

		> .day {
			flex-flow: column-reverse nowrap;
		}
	}
}
</style>