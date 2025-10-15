<template>
  <header id="main-header">
				<AppNavbar>
					<template #home>
						Weather App
					</template>
					<template #location-settings>
						<location-settings-dialog
							:location="UserLocation"
							:locations="getLocationHistory"
							:use-search-a-p-i="getMapboxSearchResponse"
						/>
					</template>
					<template #weather>
						<nuxt-link :to="{ name: 'weather' }">
							{{ UserLocation.place_name }}
						</nuxt-link>
					</template>
				</AppNavbar>
			</header>
</template>

<script lang="ts" setup>
const {
    UserLocation,
    getLocationHistory,
    getMapboxSearchResponse,
} = useLocationStore();
</script>

<style>

</style>