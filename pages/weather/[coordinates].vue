<script lang="ts" setup>
import type { WeatherAPIResponse } from '~/types';

definePageMeta({
	layout: false,
	validate(route) {
		const regex = /^(-?\d+\.{1}\d+),{1}(-?\d+\.{1}\d+)$/gm
		return regex.test(route.params.coordinates as string)
	},
})

const route = useRoute()
const { weather } = storeToRefs(weatherStore())
const coordinates = computed(() => route.params.coordinates)
  
const { data, status, refresh } = await useFetch(`/api/weather/`,{ 
	query: {
		location: route.params.coordinates
	},
	watch: [coordinates],
	lazy: true
});

watch(
  () => route.params.coordinates,
  async (newCoords) => {
	if (newCoords) {
	  refresh()
	}
  },
  { immediate: true }
);

watch(
	() => data.value,
	(newData) => {
		weatherStore().saveWeatherData(newData as WeatherAPIResponse["weather"]["data"])
	}
)

</script>

<template>
	<NuxtLayout name="weather-base">
		<template #current>
			<header>
				<h1>Right now</h1>
			</header>
		</template>
		<template #week>
			<header>
				<h1>The week ahead</h1>
			</header>
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