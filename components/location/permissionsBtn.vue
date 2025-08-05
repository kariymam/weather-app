<script lang="ts" setup>
import type { GeolocationNavigatorError } from '~/types';

const { geolocationStatus, clickFunc } = defineProps<{
	clickFunc: () => void;
	geolocationStatus: {
		isError: boolean;
		error: GeolocationNavigatorError;
		success: boolean;
	};
}>();

</script>

<template>
	<v-alert
		v-if="geolocationStatus.isError"
		:title="geolocationStatus.error.message"
		type="warning"
	/>
	<v-btn
		v-if="geolocationStatus.success === false && geolocationStatus.isError === false"
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
		v-else-if="geolocationStatus.success === false && geolocationStatus.error.name === 'PERMISSION_DENIED'"
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
</template>
