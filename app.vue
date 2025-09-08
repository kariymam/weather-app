<script setup lang="ts">
const {
	location,
	coordinates
} = await useLocationStore();

const { data, status, refresh } = await useFetch(`/api/weather/`,{ 
	query: {
    	location: coordinates
	},
	watch: [coordinates]
});

onBeforeMount(() => {
	refresh()
})

</script>

<template>
	<NuxtLayout>
		<NuxtPage
			:location="location"
			:coordinates="coordinates"
			:weather="{ data, status, refresh }"
		/>
	</NuxtLayout>
</template>
