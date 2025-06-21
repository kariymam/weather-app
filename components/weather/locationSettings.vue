<script lang="ts" setup>
import type { MapboxResponse, MapboxResponseFeature } from '~/types';

const { location } = useWeatherStore();
const dialog = shallowRef(false);
const search: Ref<MapboxResponseFeature | null> = ref(null);
const searchResults: Ref<MapboxResponse[]> = ref([]);
const { useNavigatorGeolocation, navigatorError } = useWeatherStore();

watch(location, () => dialog.value = false);
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
					<v-icon-btn
						icon="mdi-close"
						@click="() => {
							dialog = false
						}"
					/>
				</template>
			</v-toolbar>
			<v-list lines="two">
				<v-list-item
					title="Current location"
				>
					{{ location.place_name }}
				</v-list-item>
				<v-divider />
				<v-list-item
					subtitle="Seach for a different location"
					title="Select a new location"
				>
					<v-autocomplete
						v-model="search"
						append-inner-icon="mdi-magnify"
						auto-select-first
						class="mx-auto pt-4"
						density="comfortable"
						item-title="place_name"
						item-value="place_name"
						:items="searchResults"
						label="Search"
						menu-icon=""
						placeholder="Anywhere, USA"
						return-object
						rounded
						variant="solo"
						@update:search="(value) => console.log(value)"
					/>
				</v-list-item>
				<v-divider />
				<v-list-item
                title="Geolocation"
				>
                <v-alert
                    v-if="navigatorError[0]"
                    type="warning"
                >
                    {{ navigatorError }}
                </v-alert>
					<v-btn
						v-else
						class="mb-4"
						@click="() => {
							useNavigatorGeolocation()
						}"
					>
						Get current location
					</v-btn>
				</v-list-item>
			</v-list>
		</v-card>
	</v-dialog>
</template>
