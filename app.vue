<script lang="ts" setup>
const { UserLocation, getCoordinates } = useLocationStore()
await useFetch(`/api/weather/`, {
	query: { location: getCoordinates.value },
}); 

</script>
<template>
	<NuxtLayout>
		<app-header :location="UserLocation"/>
		<NuxtPage :location="UserLocation" />
	</NuxtLayout>
</template>
<style lang="css">
@import url('~/assets/css/globals.css');
</style>