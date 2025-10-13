<script lang="ts" setup>
import type { MapboxResponseFeature } from '~/types';
import type { IUserLocation } from '~/validators';
const { handleLocationPermissionsBtn, handleSearchSelect } = useLocationActions()

const { 
	location,
	locations, 
	useSearchAPI, 
} = defineProps<{
	location: IUserLocation;
	locations: Array<[string,IUserLocation]>;
	useSearchAPI: (query: string) => Promise<MapboxResponseFeature[] | undefined>;
}>();

const dialog = ref(false);

const settings = {
	title: 'Change location'
}

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
				variant="outlined"
				v-bind="activatorProps"
			>
				{{ settings.title }}
			</v-btn>
		</template>
		<v-card>
			<v-toolbar>
				<v-toolbar-title>{{ settings.title }}</v-toolbar-title>
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
					title="Location"
					subtitle="Your current location setting"
				>
					<v-col>
						<v-row>
							<p>{{ location.place_name }}</p>
						</v-row>
					</v-col>
				</v-list-item>
				<v-divider />
				<v-list-item title="Allow Location" subtitle="Enable location services">
					<location-permissions-btn
						:permissions-func="() =>{ 
							handleLocationPermissionsBtn()
							return dialog = false
						}"
					/>
				</v-list-item>
				<v-divider />
				<v-list-item
					title="Search"
					subtitle="Search and select a new location"
				>
					<location-search
						:select-func="(res) => {
							handleSearchSelect(res)
							return dialog = false
						}"
						:search-func="useSearchAPI"
					/>
				</v-list-item>
				<v-list-item>
					{{ locations }}
				</v-list-item>
			</v-list>
		</v-card>
	</v-dialog>
</template>
