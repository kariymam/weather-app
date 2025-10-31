<script lang="ts" setup>
import type { IUserLocation } from '~/validators';

const {
    getLocationHistory,
	getCoordinates,
    getMapboxSearchResponse,
} = useLocationStore();

const { 
	location,
} = defineProps<{
	location: IUserLocation;
}>();
</script>

<template>
  <header id="main-header">
		<AppNavbar>
			<template #home>
				Weather App
			</template>
			<template #location-settings>
				<location-settings-dialog
					:location="location"
					:locations="getLocationHistory"
					:use-search-a-p-i="getMapboxSearchResponse"
				/>
			</template>
			<template #weather>
				<nuxt-link :to="{ name: 'weather-coordinates', params: { coordinates: getCoordinates } }">
					{{ location.place_name }}
				</nuxt-link>
			</template>
		</AppNavbar>
	</header>
</template>

<style>

</style>