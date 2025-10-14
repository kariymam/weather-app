<script setup lang="ts">
const {
    UserLocation,
	getLocationHistory,
	useSearchAPI,
} = await useLocationStore();
  
</script>

<template>
	<v-app>
		<header id="main-header">
			<AppNavbar>
				<template #home>
					Weather App
				</template>
				<template #location-settings>
					<location-settings-dialog
						:location="UserLocation"
						:locations="getLocationHistory"
						:use-search-a-p-i="useSearchAPI"
					/>
				</template>
				<template #weather>
					<nuxt-link :to="{ name: 'weather' }">
						{{ UserLocation.place_name }}
					</nuxt-link>
				</template>
			</AppNavbar>
		</header>
			<NuxtPage
				:location="UserLocation"
			/>
	</v-app>
</template>
