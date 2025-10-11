<script lang="ts" setup>
const { permissionsFunc } = defineProps<{
	permissionsFunc: () => void;
}>();

</script>

<template>
	<v-btn
		prepend-icon="mdi-map-marker"
		class="my-2"
		size="small"
		variant="outlined"
		@click="() => {
			permissionsFunc()
		}"
	>
		Allow access to current location
	</v-btn>
</template>
