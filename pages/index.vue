<script lang="ts" setup>
import type { IUserLocation } from '~/validators';

const { location, location_history } = defineProps<{
	location: IUserLocation;
	location_history: Map<string,IUserLocation>;
}>();

</script>

<template>
	<NuxtLayout name="default">
		{{ location }}
		{{ location_history }}
	</NuxtLayout>
</template>
