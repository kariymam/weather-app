<script lang="ts" setup>
import '../styles/global.css';

const {
	location,
	locations,
	coordinates,
	geolocationAPI,
	useGeolocationAPI,
	useSearchAPI,
	saveLocationFromMapbox,
	saveLocation,
} = await useLocationStore();

</script>

<template>
	<v-app>
		<AppNavbar>
			<template #location>
				{{ location.place_name }}
			</template>
			<template #location-settings>
				<location-settings-dialog
					:location="location"
					:locations="locations"
					:geolocation-a-p-i="geolocationAPI"
					:use-geolocation-a-p-i="useGeolocationAPI"
					:use-search-a-p-i="useSearchAPI"
					:save-location-from-mapbox="saveLocationFromMapbox"
					:save-location="saveLocation"
				/>
			</template>
			<template #weather>
				<nuxt-link :to="{ name: 'coordinates', params: { coordinates } }">Weather</nuxt-link>
			</template>
		</AppNavbar>
		<v-main>
			<slot />
		</v-main>
	</v-app>
</template>

<style>
/* .container {
	display: flex;
	flex-flow: column nowrap;
  container-type: inline-size;
	overflow: auto hidden;
	overscroll-behavior-x: contain;
	scroll-snap-type: x mandatory;
  border: solid 1px #010c1346;
  border-radius: 4px;
  width: 100%;
  height: 273px;
}

ul#periodsByDay {
	display: grid;
	grid-template-columns: repeat(7, auto);
	gap: 0.5em;
	margin-bottom: 1em;
} */
</style>
