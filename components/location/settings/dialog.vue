<script lang="ts" setup>
import type { Geolocation, GeolocationNavigatorError, MapboxResponseFeature } from '~/types';

const { location, locations, geolocationAPI, useSearchAPI, useGeolocationAPI, saveLocationFromMapbox, saveLocation } = defineProps<{
	location: Geolocation;
	locations: Set<Geolocation>;
	geolocationAPI: {
		isError: boolean;
		error: GeolocationNavigatorError;
		success: boolean;
	};
	useGeolocationAPI: () => Promise<GeolocationPosition | undefined>;
	useSearchAPI: (query: string) => Promise<MapboxResponseFeature[] | undefined>;
	saveLocationFromMapbox: (res: MapboxResponseFeature) => {
		place_name: string | '';
		coordinates: {
			latitude: number | string;
			longitude: number | string;
		};
	};
	saveLocation: (location: Geolocation) => Geolocation;
}>();

const route = useRoute();
const router = useRouter();
const dialog = ref(false);
const currentLocation = computed(() => location);
const selected: Ref<MapboxResponseFeature | null> = ref(null);

const handleLocationPermissionsBtn = async () => {
	const results = await useGeolocationAPI();
	if (results) {
		useSetCookie(location);
		if (route.params.coordinates) {
			router.push({ name: 'coordinates', params: { coordinates: `${results.coords.latitude},${results.coords.longitude}` } });
		}
		return dialog.value = false;
	}
};

const handleSearchSelect = async (res: MapboxResponseFeature) => {
	selected.value = res;

	dialog.value = false;

	if (res) {
		const [longitude, latitude] = res.center;

		const place_name = res.place_name;

		useSetCookie({ place_name, coordinates: { longitude, latitude } });

		saveLocationFromMapbox(res);

		if (route.params.coordinates) {
			router.push({ name: 'coordinates', params: { coordinates: `${latitude},${longitude}` } });
		}

		return dialog.value = false;
	}
	else {
		dialog.value = false;
		selected.value = null;
		throw Error('No mapbox response');
	}
};

watch(currentLocation, (newLocation) => {
	saveLocation(newLocation);
	return newLocation ? dialog.value = false : dialog.value;
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
				{{ location.place_name }}
			</v-btn>
		</template>
		<v-card>
			<v-toolbar>
				<v-toolbar-title>Location Settings</v-toolbar-title>
				<template #append>
					<div class="d-flex ga-4 align-center">
						<v-btn
							prepend-icon="mdi-close"
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
					<v-col>
						<v-row>
							<p>{{ location.place_name }}</p>
						</v-row>
					</v-col>
				</v-list-item>
				<v-list-item subtitle="Location services">
					<location-permissions-btn
						:geolocation-status="geolocationAPI"
						:click-func="handleLocationPermissionsBtn"
					/>
				</v-list-item>
				<v-divider />
				<v-list-item
					subtitle="Seach for a different location"
					title="Select a new location"
				>
					<location-search
						:select-func="(res) => handleSearchSelect(res)"
						:search-func="useSearchAPI"
					/>
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
