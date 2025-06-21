<script lang="ts" setup>
const { location, coordinatesForWeatherData } = useWeatherStore();

</script>

<template>
	<div>
		<h1>Hello {{ location.place_name }}</h1>
		<h2>
			<NuxtLink
				:to="{ name: 'coordinates', params: { coordinates: coordinatesForWeatherData } }"
			>{{ coordinatesForWeatherData }}</NuxtLink>
		</h2>
	</div>
</template>
