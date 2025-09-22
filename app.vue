<script setup lang="ts">

const { 
	data, 
	status, 
	location,
    coordinates 
} = await useWeatherApi()

</script>

<template>
	<NuxtLayout>
		<NuxtPage
			:location="location"
			:coordinates="coordinates"
			:weather="{ data, status }"
		/>
	</NuxtLayout>
</template>
