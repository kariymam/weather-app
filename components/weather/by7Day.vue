<script lang="ts" setup>
import type { openmeteo, WeatherDescriptions } from '~/types';
import '../../styles/temperatures.css';
import { attachObservers } from '~/utils';
import { format } from 'date-fns'
import { UTCDate } from "@date-fns/utc";

const { daily, descriptions, status } = defineProps<{
	daily: openmeteo["daily"];
	descriptions: WeatherDescriptions[];
	status:  "idle" | "pending" | "success" | "error";
}>();

// ---- Scroll indicator

const target = useTemplateRef('observerRef');
const firstElemObserverEntry: Ref<IntersectionObserverEntry | null> = ref(null);
const lastElemObserverEntry: Ref<IntersectionObserverEntry | null> = ref(null);
const firstElemIsVisible = ref(false);
const lastElemIsVisible = ref(false);
const cardWidth = '248px';

onMounted(() => {
	if (target.value) {
		/**
		 * Is the list of elements
		 * @param target array of HTML Elements,
		 * @param ref is an array of refs
		 */

		attachObservers(useGetElement([...target.value], [0, 6]), [firstElemObserverEntry, lastElemObserverEntry])

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

	<ul
		id="periodsByDay"
		ref="periodByDay"
		:class="[ firstElemIsVisible && !lastElemIsVisible ? 'scroll-indicator-right' : !firstElemIsVisible && lastElemIsVisible ? 'scroll-indicator-left' : '']"
	>
	<li 
		v-for="(_) in Array.from({length: 7})"
		class="day"
		v-if="status !== 'success'">
		<v-skeleton-loader 
			type="card">
		</v-skeleton-loader>
	</li>
	<li
		v-for="({ time, weather_code, precipitation_probability_max, temperature_2m_max, temperature_2m_min }, idx) in daily"
		v-if="status === 'success'"
		:key="idx"
		class="day"
		ref="observerRef"
	>
			<WeatherDay>
				<template #weekday>
					{{ format(new UTCDate(time), 'eee') }}
				</template>
				<template v-if="idx === 0 || idx === 6" #date>
					{{ format(new UTCDate(time), 'MMM c') }}
				</template>
				<template #weather-code>
					 <WeatherCode :code="weather_code" />
				</template>
				<template #description>
					<p>{{ descriptions && descriptions[idx]["shortForecast"] }}</p>
				</template>
				<template #high-temperature>
					<span>H</span>
					{{ Math.ceil(temperature_2m_max) }}
				</template>
				<template #low-temperature>
					<span>L</span>
					{{ Math.ceil(temperature_2m_min) }}
				</template>
				<template v-if="precipitation_probability_max > 20" #precipitation>
					<span class="probability">
						{{ precipitation_probability_max }}%
					</span>
				</template>
			</WeatherDay>
		</li>
	</ul>
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
		border: thin solid;
		border-radius: 4px;
		backdrop-filter: blur(10px);
		display: flex;
		flex-flow: column nowrap;
		width: v-bind(cardWidth);
		> * {
			height: 100%;
			width: 100%;
			display: flex;
			min-height: 340px;
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