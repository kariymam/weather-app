<script lang="ts" setup>
import type { IUserLocation } from '~/validators';

const { location } = defineProps<{
	location: IUserLocation;
}>();

</script>

<template>
	<NuxtLayout name="default">
		{{ location }}
	</NuxtLayout>
</template>
