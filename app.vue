<script setup lang="ts">
const {
	location,
	coordinates
} = await useLocationStore();

</script>

<template>
	<NuxtLayout>
		<NuxtPage
			:location="location"
			:coordinates="coordinates"
		/>
	</NuxtLayout>
</template>
