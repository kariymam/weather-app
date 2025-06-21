<script lang="ts" setup>
definePageMeta({
	validate: async (route) => {
		return typeof route.params.coordinates === 'string' && /-?\d{2}.\d+,-?\d{2}.\d+/.test(route.params.coordinates);
	},
});
</script>

<template>
	<div>
		{{ $route.params }}
	</div>
</template>
