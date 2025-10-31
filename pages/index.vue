<script lang="ts" setup>
definePageMeta({
	middleware: 'cookie'
})
import type { IUserLocation } from '~/validators';
const { 
	location,
} = defineProps<{
	location: IUserLocation;
}>();

</script>

<template>
		{{ location }}
</template>
