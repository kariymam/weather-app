<script lang="ts" setup>
import type { WeatherApiResponse } from '~/types';

const { alerts } = defineProps<{
	alerts: WeatherApiResponse['alerts'];
}>();
</script>

<template>
	<div v-if="alerts !== undefined">
		<v-alert
			v-for="({ headline, description }, idx) in alerts"
			:key="idx"
			:text="description"
			:title="headline"
			type="warning"
			closable
		/>
	</div>
</template>
