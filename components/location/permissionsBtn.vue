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
	<v-btn
		v-if="status.success === false"
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
	<p v-else>
		on
	</p>
</template>
