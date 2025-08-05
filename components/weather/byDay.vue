<script lang="ts" setup>
import type { WeatherGovPeriods } from '~/types';

const { period, idx } = defineProps<{
	period: {
		name: string;
		daytime: WeatherGovPeriods | null;
		night: WeatherGovPeriods;
		assets: {
			icon: string[];
			cldURL: string;
			cardColor: string | string[];
		};
	} | undefined;
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
