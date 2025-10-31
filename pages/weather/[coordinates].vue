<script setup lang="ts">
import '~/assets/css/weather.css'
import type { IUserLocation } from '~/validators';
const { 
	location,
} = defineProps<{
	location: IUserLocation;
}>();

useHead({
  title: `Weather | ${location.place_name.split(',')[0]}`,
  meta: [
    { name: 'Weather App', content: 'A weather app.' },
  ],
})

definePageMeta({
	middleware: ['coordinates'],
})

const route = useRoute()
const coordinates = computed(() => route.params.coordinates)
const { data, status, refresh } = await useFetch(`/api/weather/`, {
	query: { location: coordinates.value },
	lazy: true,
	watch: [coordinates]
}); 

  const {
    images,
    current,
    daily,
    weatherGov_alerts,
    weatherGov_descriptions,
    currentDescription,
  } = storeToRefs(weatherStore())

watch(() => data.value, (newData) => {
	if (newData) {
		weatherStore().updateImages(newData["images"])
		weatherStore().updateOpenmeteoRes(newData["openmeteo"])
		weatherStore().updateWeatherGovAlerts(newData["weatherGov_alerts"])
		weatherStore().updateWeatherGovDescriptions(newData["weatherGov_descriptions"])
	}
})

onMounted(async () => await refresh())

</script>

<template>
		{{ status }}
		<WeatherAlerts :alerts="weatherGov_alerts"></WeatherAlerts>
		<WeatherDashboard>
			<template #one>
				<div class="background">
					<!-- <WeatherBackgroundSVG/> -->
				</div>
				<h2>Right now...</h2>
				<div>
					<weather-current>
						<template #image>
							<!-- <NuxtImg :src="images?[0]" /> -->
						</template>
						<template #temperature2m="{ rounded }">
							{{ rounded(current?.temperature2m) }}
						</template>
						<template #apparentTemperature="{ rounded }">
							{{ rounded(current?.apparentTemperature) }}
						</template>
						<template #detailedForecast>
							{{ currentDescription }}
						</template>
					</weather-current>
				</div>
			</template>
			<template #two>
				<h2>The week ahead</h2>
				<div>
					<WeatherBy7Day :daily="daily" :images="images" :descriptions="weatherGov_descriptions">
					</WeatherBy7Day>
				</div>
			</template>
		</WeatherDashboard>
</template>

<style lang="css">
.background {
	position: absolute;
	inset: 0;
	object-fit: cover;
	height: 100%;
	width: 100%;
	z-index: 0;
}

section:has(.background) *:not(.background) {
	z-index: 1;
}

.background::before {
	content: '';
	display: block;
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	position: absolute;
}

video {
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	object-fit: cover;
}
</style>