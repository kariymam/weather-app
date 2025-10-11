<script setup lang="ts">

const {
    UserLocation,
	Locations,
	useSearchAPI,
} = await useLocationStore();
  
</script>

<template>
	<v-app>
		<AppNavbar>
			<template #home>
				Weather App
			</template>
			<template #location-settings>
				<location-settings-dialog
					:location="UserLocation"
					:locations="Locations"
					:use-search-a-p-i="useSearchAPI"
				/>
			</template>
			<template #weather>
				<nuxt-link :to="{ name: 'weather' }">Weather</nuxt-link>
			</template>
		</AppNavbar>
		<v-main>
				<NuxtPage
					:location="UserLocation"
					:location_history="Locations"
				/>
		</v-main>
	</v-app>
</template>
