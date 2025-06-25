<script lang="ts" setup>
const { location } = useLocationStore();
</script>

<template>
	<ui-hero :location="location">
		<template #default="{ data }">
			<h1>Hello {{ data.place_name }}</h1>
			<p>{{ data.coordinates }}</p>
		</template>
	</ui-hero>
</template>
