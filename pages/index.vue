<script lang="ts" setup>
import type { Geolocation, WeatherAPIResponse } from '~/types';

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
