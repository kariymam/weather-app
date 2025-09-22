<script lang="ts" setup>
const { weather, location } = defineProps<{
	weather: WeatherAPIResponse["weather"];
	location: Geolocation;
}>();

</script>

<template>
	<div>
		 {{ location }}
		 {{ weather }}
	</div>
</template>
