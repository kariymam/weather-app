<script lang="ts" setup>
definePageMeta({
	middleware: 'coordinates'
})
const route = useRoute()
const coordinates = computed(() => `${route.params.coordinates}`)
const {
	updateOpenmeteoRes,
	updateWeatherGovAlerts,
	updateWeatherGovDescriptions,
	openmeteo,
	weatherGov_alerts,
	weatherGov_descriptions
} = await useWeatherStore();

const { data: weather, status, refresh } = await useFetch(
		'/api/weather/', { 
		query: {
			location: coordinates.value
		}
})

if (weather.value){
	updateOpenmeteoRes(weather.value["openmeteo"])
	updateWeatherGovAlerts(weather.value["weatherGov_alerts"])
	updateWeatherGovDescriptions(weather.value["weatherGov_descriptions"])
}

onMounted(refresh)

</script>

<template>
	<NuxtLayout name="weather-base">
		<template #navigation>
		</template>
		<template #alerts>
			<WeatherAlerts :alerts="weatherGov_alerts">
			</WeatherAlerts>
		</template>
		<template #current>
			<header>
				<h1>Right now...</h1>
			</header>
			<article>
				<weather-current 
					:weather_code="openmeteo?.current.weather_code"
					:temperature="openmeteo?.current.temperature2m" 
					:description="weatherGov_descriptions?.[0].detailedForecast">
				</weather-current>
			</article>
		</template>
		<template #week>
			<header>
				<h1>The week ahead</h1>
			</header>
			<article>
				<WeatherBy7Day 
					:daily="openmeteo?.daily" 
					:descriptions="weatherGov_descriptions" 
					:status="status">
				</WeatherBy7Day>
			</article>
		</template>
		<template #video>
			Video here
		</template>
	</NuxtLayout>
</template>