<script lang="ts" setup>
const { alerts } = defineProps<{
	alerts: { title: string; text: string }[];
}>();
</script>

<template>
	<div v-if="alerts !== undefined">
		<v-alert
			v-for="({ text, title }, idx) in alerts"
			:key="idx"
			:text="text"
			:title="title"
			type="warning"
			closable
		/>
	</div>
</template>
