<script lang="ts" setup>
const { period, idx } = defineProps<{
	period: {
		time: Date;
		temperature2m: number;
		apparentTemperature: number;
		precipitationProbability: number;
		showers: number;
		rain: number;
		snowfall: number;
	};
	idx: number;
	isLoading: boolean;
}>();
</script>

<template>
	<li v-if="period">
		{{ idx }}
		{{ period }}
	</li>
</template>
