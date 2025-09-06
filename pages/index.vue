<script lang="ts" setup>
import type { Geolocation } from '~/types';

const { coordinates } = defineProps<{
	coordinates: string;
}>();

const location = ref(coordinates)

const { data, status, refresh } = await useFetch(`/api/weather/`,{ 
	query: {
    	location
	}
});

onBeforeMount(() => {
	refresh()
})

</script>

<template>
	<div>
		{{ coordinates }}
		{{ data }}
		{{ status }}
	</div>
</template>
