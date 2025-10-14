<script lang="ts" setup>
import type { IUserLocation } from '~/validators';

const { location } = defineProps<{
	location: IUserLocation;
}>();

const {
	createUserLocation,
	getUserPlaceName,
	updateUserLocation,
} = await useLocationStore();

const {
	updateCoordinates,
	updateOpenmeteoRes,
	updateWeatherGovAlerts,
	updateWeatherGovDescriptions,
	weatherCoordinates,
	openmeteo,
	weatherGov_alerts,
	weatherGov_descriptions
} = await useWeatherStore();

const route = useRoute()
const coordinates = computed(() => `${route.params.coordinates}`)
const currentLocation = ref<IUserLocation>(location)
updateUserLocation(currentLocation.value.place_name, currentLocation.value)

const { data: weather, status, refresh } = useAsyncData(
	coordinates,
	() => $fetch(`/api/weather/`,{ 
	query: {
		location: coordinates.value
	},
  })
)

onMounted(() => {
watch(
	coordinates,
	async (newCoords) => {
		const newLocation = await getUserPlaceName(createUserLocation(newCoords))
		currentLocation.value = newLocation
		await refresh()
		updateCoordinates(newCoords)
	},
	{ immediate: true }
)

watch(
	currentLocation,
	(newLocation) => {
		updateUserLocation(newLocation.place_name, newLocation)
	},
	{ immediate: true }
)

watch(
	weatherCoordinates,
	(newCoords) => {
		if(newCoords){
			if (weather.value){
				updateOpenmeteoRes(weather.value["openmeteo"])
				updateWeatherGovAlerts(weather.value["weatherGov_alerts"])
				updateWeatherGovDescriptions(weather.value["weatherGov_descriptions"])
			}
		}
	},
	{ immediate: true }
)
})
</script>

<template>
	<NuxtLayout name="weather-base">
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
					v-if="openmeteo.hasOwnProperty('current')"
					:weather_code="openmeteo['current'].weather_code"
					:temperature="openmeteo['current'].temperature2m" 
					:description="weatherGov_descriptions[0].detailedForecast">
				</weather-current>
			</article>
		</template>
		<template #week>
			<header>
				<h1>The week ahead</h1>
			</header>
			<article>
				<WeatherBy7Day 
					v-if="openmeteo.hasOwnProperty('daily')"
					:daily="openmeteo['daily']" 
					:descriptions="weatherGov_descriptions" 
					:status="status">
				</WeatherBy7Day>
			</article>
		</template>
		<template #video>
			{{ openmeteo['current']?.weather_code }}
		</template>
	</NuxtLayout>
</template>
<style lang="css">

section header {
	padding: 0 calc(var(--global-padding) * 2) 0 calc(var(--global-padding) * 2);
}

</style>