<script lang="ts" setup>
import type { MapboxResponseFeature } from '~/types';
import type { IUserLocation } from '~/validators';
const { handleLocationPermissionsBtn, handleSearchSelect } = await useLocationStore()
import { onClickOutside } from '@vueuse/core'
import { useA11YDialog } from '~/utils';
import type A11yDialog from 'a11y-dialog';

const { 
	location,
	locations, 
	useSearchAPI, 
} = defineProps<{
	location: IUserLocation;
	locations: Array<[string,IUserLocation]>;
	useSearchAPI: (query: string) => Promise<MapboxResponseFeature[] | undefined>;
}>();

const isOpen = ref(false);
const dialogEl = useTemplateRef('dialogEl')
const dialogElContainer = useTemplateRef('dialog-content')
const dialog: Ref<A11yDialog | null> = ref(null)
const openDialog = () => (isOpen.value = !isOpen.value);
const closeDialog = () => isOpen.value = false;

onMounted(() => {
	if(dialogEl.value){
		const elem = useA11YDialog(dialogEl.value)
		dialog.value = elem
		onClickOutside(dialogElContainer, closeDialog);
	}
})

watch(() => location, (newLocation) => {
	if(newLocation){
		isOpen.value = false
	}
})

</script>

<template>
		<button data-a11y-dialog-show="location-settings" @click="openDialog">
			Change location
		</button>
		<div 
			id="location-settings" 
			ref="dialogEl"
			v-show="isOpen"
			aria-hidden="true"
			aria-labelledby="location-settings-title"
			>
			<div class="dialog__overlay" data-a11y-dialog-hide></div>
			<div class="dialog__container" role="document">
				<div class="dialog__content" ref="dialog-content">
					<div>
						<h1 id="location-settings-title">Change location</h1>
						<button
							data-a11y-dialog-hide 
							aria-label="Close dialog"
							@click="closeDialog"
						>Close</button>
					</div>
					<div>
							<h2>Location</h2>
							<h3>Your current location setting</h3>
							<p>{{ location.place_name }}</p>
						<hr />
					</div>
					<div>
						<h2>Allow Geolocation</h2>
						<h3>Enable location services</h3>
						<location-permissions-btn
							:permissions-func="async () =>{ 
								// dialog = false
								const _locaton = await handleLocationPermissionsBtn(locations)
								const coordinates = _locaton.coordinates.join(',')
								return navigateTo({ name: 'weather-coordinates', params: { coordinates } });
							}"
						/>
						<hr />
					</div>
					<div>
							<h2>Search</h2>
							<h3>Search and select a new location</h3>
							<!-- <location-search
								:select-func="(res) => {
									dialog = false
									handleSearchSelect(res)
									return navigateTo({ name: 'weather'});
								}"
								:search-func="useSearchAPI"
							/> -->
						<hr />
					</div>
					<div>
						<h2>History</h2>
						<weather-history :locations="locations" />
					</div>
				</div>
			</div>
		</div>
</template>
<style lang="css" scoped>
#location-settings,
.dialog__container,
.dialog__overlay {
  position: fixed; /* 1 */
  inset: 0; /* 1 */
  z-index: 2;
}

.dialog__overlay {
  background-color: rgb(43 46 56 / 0.9)
}

.dialog__content {
	background-color: #fff;
	display: flex;
    flex-flow: column;
}
</style>