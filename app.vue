<script setup lang="ts">
const {
	location,
} = await useLocationStore();

</script>

<template>
	<NuxtLayout>
		<NuxtPage
			:location="location"
		/>
	</NuxtLayout>
</template>
