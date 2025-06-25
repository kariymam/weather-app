<script lang="ts" setup>
const { location } = useLocationStore();
</script>

<template>
	<ui-hero :location="location">
		<template #heading>
			Weather
		</template>
		<template #forecast="{ coordinates }">
			{{ coordinates }}
			<weather-periods :coordinates="coordinates" />
		</template>
		<template #subtitle="{ place }">
			{{ place }}
		</template>
	</ui-hero>
</template>
