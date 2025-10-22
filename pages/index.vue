<script lang="ts" setup>
definePageMeta({
	layout: 'default',
})
const {
    UserLocation
} = useLocationStore();

</script>

<template>
		{{ UserLocation }}
</template>
