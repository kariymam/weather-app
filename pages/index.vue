<script lang="ts" setup>
import type { Geolocation } from '~/types';

const { location } = defineProps<{
	location: Geolocation;
}>();

const coordinates = computed(() => `${location.coordinates.latitude},${location.coordinates.longitude}`);

const { data, status, refresh } = await useFetch(`/api/weather/${coordinates.value}`, {
	method: 'post',
	body: {
		data: location,
	},
},
);

onBeforeMount(() => {
	refresh()
})

</script>

<template>
	<div>
		{{ data }}
		{{ status }}
	</div>
</template>
