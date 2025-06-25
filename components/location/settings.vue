<script lang="ts" setup>
import type { Geolocation, GeolocationNavigatorError } from '~/types';

const { status, location, locations } = defineProps<{
	location: Geolocation;
	locations: Set<Geolocation>;
	status: {
		isError: boolean;
		error: GeolocationNavigatorError;
		success: boolean;
	};
}>();

const dialog = ref(false);

watch(
	() => location,
	(newLocation) => {
		if (newLocation) {
			dialog.value = false;
		}
	});
</script>

<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		transition="dialog-bottom-transition"
	>
		<template #activator="{ props: activatorProps }">
			<v-btn
				prepend-icon="mdi-map-marker"
				size="small"
				variant="text"
				v-bind="activatorProps"
			>
				Location Settings
			</v-btn>
		</template>
		<v-card>
			<v-toolbar>
				<v-toolbar-title>Location Settings</v-toolbar-title>
				<template #append>
					<div class="d-flex ga-4 align-center">
						<v-icon-btn
							icon="mdi-close"
							@click="() => {
								dialog = false
							}"
						/>
					</div>
				</template>
			</v-toolbar>
			<v-list lines="two">
				<v-list-item
					title="Current location"
				>
					<v-alert
						v-if="status.isError"
						type="warning"
					>
						{{ status.error }}
					</v-alert>
					<v-col>
						<v-row>
							<p>{{ location.place_name }}</p>
						</v-row>
					</v-col>
				</v-list-item>
				<v-list-item subtitle="Location services">
					<slot name="location-permissions" />
				</v-list-item>
				<v-divider />
				<v-list-item
					subtitle="Seach for a different location"
					title="Select a new location"
				>
					<slot name="location-search" />
				</v-list-item>
				<v-list-item
					v-if="locations.size > 0"
					:subtitle="locations.size === 1 ? 'Previous location' : 'Previous locations'"
				>
					<div
						v-for="(place, idx) in locations"
						:key="idx"
					>
						{{ place.place_name }}
					</div>
				</v-list-item>
			</v-list>
		</v-card>
	</v-dialog>
</template>
