<script lang="ts" setup>
definePageMeta({
	validate: async (route) => {
		return typeof route.params.coordinates === 'string' && /-?\d{2,}.\d+,-?\d{2,}.\d+/.test(route.params.coordinates);
	},
});

const route = useRoute();

const coordsForReverse = computed(() => {
	const [latitude, longitude] = String(route.params.coordinates).split(',');
	return `${longitude},${latitude}`;
});

const { data, status, refresh } = await useAsyncData(
	'weather',
	() => $fetch(`/api/weather/${route.params.coordinates}`),
	{ watch: [() => route.params.coordinates] },
);

const { place_name } = await $fetch(`/api/geolocation/reverse/${coordsForReverse.value}`);

const location = computed(() => useParseCoordsPlaceToLocation(route.params.coordinates, place_name));

watch(() => route.params.coordinates, async () => {
	refresh();
});
</script>

<template>
	<div>
		<weather-hero
			:location="location"
			:data="data"
			:status="status"
		/>
	</div>
</template>
