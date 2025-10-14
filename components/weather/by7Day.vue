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

// ---- Device detection
const device = useDevice()
const cardWidth = '248px';
const full = ref(device.isMobile || device.isTablet ? 'full' : ' ')

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

		const elems = useGetElement(target.value, [0, 6])
		attachObservers(elems, [firstElemObserverEntry, lastElemObserverEntry])
	}

	if (firstElemObserverEntry || lastElemObserverEntry) {

		watch(firstElemObserverEntry, (newVal) => {
			if (newVal) {
				firstElemIsVisible.value = newVal?.isIntersecting
			}
		})

		watch(lastElemObserverEntry, (newVal) => {
			if (newVal) {
				lastElemIsVisible.value = newVal?.isIntersecting
			}
		})
	}
})

// ----

onUpdated(() => {
	const elems = useGetElement(target.value as Element | Element[], [0, 6])
	attachObservers(elems, [firstElemObserverEntry, lastElemObserverEntry])
})

</script>

<template>
	<div class="by7DayContainer">
		<ul
			id="periodsByDay"
			ref="periodByDay"
			:class="full + ' ' + [ firstElemIsVisible && !lastElemIsVisible ? 'scroll-indicator-right' : !firstElemIsVisible && lastElemIsVisible ? 'scroll-indicator-left' : '']"
		>
		<li 
			v-for="(_) in Array.from({length: 7})"
			class="day"
			v-if="status !== 'success'"
			>
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
	</div>

</template>

<style lang="css">
.by7DayContainer {
	display: grid;
	grid-template-columns: 12px 1fr 12px;
	grid-template-rows: minmax(max-content, 1fr);
	padding: 12px 0;
	> * {
		grid-column: 2 / -2;
	}
	> .full {
		grid-column: 1 / -1;
	}
}


#periodsByDay {
	--column-gap: 0.5em;
	--row-gap: 1em;
	--border-radius: 1em;
	/* --grid: auto / auto; */
	--grid: auto 1fr / repeat(7, auto);
	--font-size-smallest: 0.75rem;
	--scroll-shadow-left: no-repeat left/ 20% radial-gradient(circle at left, rgba(0, 0, 0, 0.2), transparent);
	--scroll-shadow-right: no-repeat right/ 20% radial-gradient(circle at right, rgba(0, 0, 0, 0.2), transparent);
	--border-color: rgb(0,0,0,0.10);

	display: grid;
	grid-gap: 10px;
	grid-template: var(--grid);
	column-gap: var(--column-gap);
	row-gap: var(--row-gap);
	padding: var(--row-gap) calc(var(--row-gap) * 2) 0.5rem var(--row-gap);
	position: relative;
	border: thin var(--border-color) solid;
	border-radius: var(--border-radius);
	/* background: var(--scroll-shadow-left),
	var(--scroll-shadow-right); */
	transition-property: background;
	grid-auto-flow: row;
	overflow-x: scroll;
	overflow-y: none;
	scroll-behavior: smooth;
	scroll-snap-type: x mandatory;
	scroll-snap-align: start end;
	scroll-snap-stop: always;

	> .day {
		backdrop-filter: blur(10px);
		display: flex;
		flex-flow: column nowrap;
		width: v-bind(cardWidth);
		& > * {
			border: thin var(--border-color) solid;
			border-radius: var(--border-radius);
		}
		> * {
			height: 100%;
			width: 100%;
			display: flex;
			min-height: 340px;
		}
	}
}

.probability {
	font-size: var(--font-size-smallest);
}

/* #periodsByDay.scroll-indicator-left {
	background: var(--scroll-shadow-left);
}

#periodsByDay.scroll-indicator-right {
	background: var(--scroll-shadow-right);
} */

</style>