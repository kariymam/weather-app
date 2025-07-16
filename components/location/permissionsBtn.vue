<script lang="ts" setup>
import type { Geolocation, GeolocationNavigatorError } from '~/types';

const { location, status, clickFunc } = defineProps<{
	clickFunc: () => void;
	status: {
		isError: boolean;
		error: GeolocationNavigatorError;
		success: boolean;
	};
	location: Geolocation;
}>();

watch(
	() => location,
	(newLocation) => {
		if (newLocation) {
			const { saveCookie } = useSetLocationCookie('location', newLocation);
			saveCookie();
		}
	});
</script>

<template>
	<v-alert
		v-if="status.isError"
		:title="status.error.message"
		type="warning"
	/>
	<v-btn
		v-if="status.success === false && status.isError === false"
		prepend-icon="mdi-map-marker"
		class="my-2"
		size="small"
		variant="outlined"
		@click="() => {
			clickFunc()
		}"
	>
		Allow access to current location
	</v-btn>
	<v-btn
		v-else-if="status.success === false && status.error.name === 'PERMISSION_DENIED'"
		prepend-icon="mdi-map-marker"
		class="my-2"
		size="small"
		variant="outlined"
		:disabled="true"
		@click="() => {
			clickFunc()
		}"
	>
		Allow access to current location
	</v-btn>
	<p v-else>
		on
	</p>
</template>
