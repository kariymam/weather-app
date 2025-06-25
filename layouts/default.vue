<script lang="ts" setup>
const {
	location,
	locations,
	status,
	useGeolocationAPI,
	useSearchAPI,
	saveLocationFromMapbox,
} = useLocationStore();
</script>

<template>
	<v-app>
		<AppNavbar place="Atlanta">
			<template #home>
				Home
			</template>
			<template #location-settings>
				<location-settings
					:location="location"
					:locations="locations"
					:status="status"
				>
					<template #location-permissions>
						<location-permissions-btn
							:status="status"
							:location="location"
							:click-func="useGeolocationAPI"
						/>
					</template>
					<template #location-search>
						<location-search
							:select-func="saveLocationFromMapbox"
							:search-func="useSearchAPI"
						/>
					</template>
				</location-settings>
			</template>
		</AppNavbar>
		<v-main>
			<slot />
		</v-main>
	</v-app>
</template>
