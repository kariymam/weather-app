<script setup lang="ts">

const {
    coordinates
  } = await useLocationStore();

const {
    location,
    weather: data,
    status
} = useWeatherData(coordinates)
  
</script>

<template>
	<NuxtLayout>
		<NuxtPage
			:location="location"
			:weather="{ data, status }"
		/>
	</NuxtLayout>
</template>
