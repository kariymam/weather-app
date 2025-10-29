<script setup lang="ts">
import '~/assets/css/weather.css'

definePageMeta({
	middleware: ['coordinates'],
	layout: 'weather-base',
})

const route = useRoute()
const coordinates = computed(() => route.params.coordinates)

const { data, status, refresh } = await useFetch(`/api/weather/`, {
	query: { location: coordinates.value },
	lazy: true,
	watch: [coordinates]
}); 

const {
	current,
	weatherGov_alerts,
	images,
	daily,
	weatherGov_descriptions,
	currentDescription,
	updateOpenmeteoRes,
	updateWeatherGovAlerts,
	updateWeatherGovDescriptions,
	updateImages,
} = useWeatherStore()

watch(() => data.value, (newData) => {
	if (newData) {
		updateImages(newData["images"])
		updateOpenmeteoRes(newData["openmeteo"])
		updateWeatherGovAlerts(newData["weatherGov_alerts"])
		updateWeatherGovDescriptions(newData["weatherGov_descriptions"])
	}
})

onMounted(async () => await refresh())

</script>

<template>
	<div>
		{{ status }}
		<WeatherAlerts :alerts="weatherGov_alerts"></WeatherAlerts>
		<WeatherDashboard>
			<template #one>
				<div class="background">
					<!-- <WeatherBackgroundSVG/> -->
				</div>
				<header>
					<h2>Right now...</h2>
				</header>
				<article>
					<weather-current>
						<template #image>
							<NuxtImg :src="images[0].night.image" />
						</template>
						<template #temperature2m="{ rounded }">
							{{ rounded(current.temperature2m) }}
						</template>
						<template #apparentTemperature="{ rounded }">
							{{ rounded(current.apparentTemperature) }}
						</template>
						<template #detailedForecast>
							{{ currentDescription }}
						</template>
					</weather-current>
				</article>
			</template>
			<template #two>
				<header>
					<h2>The week ahead</h2>
				</header>
				<article>
					<WeatherBy7Day :daily="daily" :images="images" :descriptions="weatherGov_descriptions">
					</WeatherBy7Day>
				</article>
			</template>
		</WeatherDashboard>
	</div>
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