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
	<v-banner 
		v-for="text in headlines"
		lines="one" 
		:stacked="false">
		<v-banner-text>
			{{  text  }}
		</v-banner-text>
		<template v-slot:actions>
			<v-btn>Dismiss</v-btn>
		</template>
	</v-banner>
</template>
