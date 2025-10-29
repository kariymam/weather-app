<script lang="ts" setup>
import type { WeatherGovAlert } from '~/types';

const { alerts } = defineProps<{
	alerts: WeatherGovAlert[];
}>();

const headlines: Ref<any[]> = ref([])

for (const alert of alerts) {
	for (let key in alert){
		if(key === 'properties'){
			headlines.value.push(alert[key]["headline"])
		}
	}
}

</script>

<template>
	<div
		v-for="text in headlines"
		lines="one" 
		:stacked="false">
		<p>
			{{  text  }}
		</p>
		<button>Dismiss</button>
	</div>
</template>
