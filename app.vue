<script setup lang="ts">
const {
	location,
	coordinates
} = await useLocationStore();

const { data, status, refresh } = await useFetch(`/api/weather/`,{ 
	query: {
    	location: coordinates
	},
	watch: [coordinates],
	lazy: true
});

watch(location, (newValue) => {
	if(newValue){
		refresh()
	}
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
