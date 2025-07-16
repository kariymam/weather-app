<script lang="ts" setup>
const { location, coordinates, coordsString } = useLocationStore();

const { data, status } = useAsyncData(
	'weather',
	() => $fetch<unknown>(`/api/weather/${coordsString()}`),
	{ watch: [coordinates] },
);
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

<style lang="css">

.current-temperature::after {
	content:'°F';
	vertical-align: text-top;
	line-height: 1.425;
}

</style>
