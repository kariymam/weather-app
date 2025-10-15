<script lang="ts" setup>
definePageMeta({
	layout: 'default',
	middleware: 'cookie'
})
const {
        UserLocation
} = useLocationStore();

</script>

<template>
		{{ UserLocation }}
</template>
