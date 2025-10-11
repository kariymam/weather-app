<script lang="ts" setup>
import type { WeatherAPIResponse } from '~/types';
import type { IUserLocation } from '~/validators';

const { location, location_history } = defineProps<{
	location: IUserLocation;
	location_history: Map<string,IUserLocation>;
}>();

definePageMeta({
	layout: 'weather-base',
	middleware: 'coordinates'
})

const {
	createUserLocation,
	getUserPlaceName,
	setUserLocation
} = await useLocationStore();

const route = useRoute()
const coordinates = computed(() => route.params.coordinates)
const currentLocation = ref<IUserLocation>(location)

const { data, status, refresh } = await useFetch(`/api/weather/`,{ 
	query: {
		location: currentLocation.value.coordinates.join(",")
	},
	watch: [coordinates],
	lazy: true
});

watch(
	coordinates,
	async (newCoords) => {
		const newLocation = await getUserPlaceName(createUserLocation(newCoords))
		currentLocation.value = newLocation
		await refresh()
	},
	{ immediate: true }
)

watch(
  currentLocation,
  (newLocation) => {
	if (newLocation) {
		setUserLocation(newLocation)
	}
  },
  { immediate: true }
);
</script>

<template>
	<!-- <NuxtLayout name="weather-base">
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
	</NuxtLayout> -->
	{{ currentLocation }}
	{{ status }}
	{{ data }}
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