<script lang="ts" setup>
import type { openmeteo, WeatherCodeObj, WeatherDescriptions } from '~/types';
import { attachObservers } from '~/utils';
import { formatISO9075, format } from "date-fns";

const { images, daily, descriptions } = defineProps<{
	daily: openmeteo["daily"];
	descriptions: WeatherDescriptions[];
	images: WeatherCodeObj[];
	// status:  "idle" | "pending" | "success" | "error";
}>();

//  Date
const date = (time: string) => ref(formatISO9075(new Date(time).setUTCHours(12, 0, 0, 0)))

//  Device detection
const device = useDevice()
const full = ref(device.isMobile || device.isTablet ? 'full' : ' ')

//  Scroll indicator
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

onUpdated(() => {
	const elems = useGetElement(target.value as Element | Element[], [0, 6])
	attachObservers(elems, [firstElemObserverEntry, lastElemObserverEntry])
})

</script>

<template>
	<div class="by7DayContainer">
		{{ firstElemIsVisible }}{{ lastElemIsVisible }}
		<ul
			id="periodsByDay"
			ref="periodByDay"
			:class="full + ' ' + [ firstElemIsVisible && !lastElemIsVisible ? 'scroll-indicator-right' : !firstElemIsVisible && lastElemIsVisible ? 'scroll-indicator-left' : '']"
		>
		<li
			v-for="({ time, weather_code, precipitation_probability_max, temperature_2m_max, temperature_2m_min }, idx) in daily"
			:key="idx"
			class="day"
			ref="observerRef"
		>
				<WeatherDay :idx="idx" :date="format(date(time).value, 'yyyy-dd-MM')">
					<template #weekday>
						{{ format(date(time).value, 'eee') }}
					</template>
					<template v-if="idx === 0 || idx === 6" #date>
						({{ format(date(time).value, 'MMM dd') }})
					</template>
					<template #weather-code>
						 <NuxtImg :src="images[idx].day.image" />
					</template>
					<template #description>
						<p>{{ descriptions && descriptions[idx]["shortForecast"] }}</p>
					</template>
					<template #high-temperature>
						{{ Math.ceil(temperature_2m_max) }}
					</template>
					<template #low-temperature>
						{{ Math.ceil(temperature_2m_min) }}
					</template>
					<template v-if="precipitation_probability_max > 20" #precipitation>
							{{ precipitation_probability_max }}%
					</template>
				</WeatherDay>
			</li>
		</ul>
	</div>

</template>