<script lang="ts" setup>
import type { WeatherCodeObj } from '~/types'
const { code } = defineProps<{
    code: WeatherCodeObj;
}>();

const mode = ref('day')

</script>

<template>
  <img v-if="mode === 'day'" :src="code.day.image" :alt="code.day.description" />
</template>