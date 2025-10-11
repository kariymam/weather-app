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

const { data: weather, status, refresh } = useAsyncData(
	coordinates,
	() => $fetch(`/api/weather/`,{ 
	query: {
		location: coordinates.value
	},
  })
)

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

</script>

<template>
	{{ weatherGov_alerts }}
	<NuxtLayout name="weather-base">
		<template #current>
			<header>
				<h1>Right now in {{ currentLocation.place_name }}</h1>
			</header>
			<weather-current 
			v-if="openmeteo.hasOwnProperty('current')"
			:current="openmeteo['current']" 
			:descriptions="weatherGov_descriptions"></weather-current>
		</template>
		<template #week>
			<header>
				<h1>The week ahead</h1>
			</header>
			<WeatherBy7Day 
			v-if="openmeteo.hasOwnProperty('daily')"
			:daily="openmeteo['daily']" 
			:descriptions="weatherGov_descriptions" 
			:status="status"></WeatherBy7Day>
		</template>
		<template #video>

		</template>
	</NuxtLayout>
</template>
<style lang="css">

.background {
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
}

.background::before {
	content: '';
	display: block;
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
    position: absolute;
	background: rgba(var(--v-theme-background), 0.5);
}

video {
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	object-fit: cover;
}

section header {
	padding: 0 calc(var(--global-padding) * 2) 0 calc(var(--global-padding) * 2);
}

</style>