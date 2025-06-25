<script lang="ts" setup>
import type { Geolocation } from '~/types';

const { location } = defineProps<{
	location: Geolocation,
}>();

</script>

<template>
	<slot :data="location" />
</template>
