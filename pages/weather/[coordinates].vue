<script lang="ts" setup>
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
} = await useLocationStore();


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
	},
	{ immediate: true }
)

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
	{{ location }}
	{{ status }}
	<v-divider/>
	{{ weather }}
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