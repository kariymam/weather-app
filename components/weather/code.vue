<script lang="ts" setup>
const { code } = defineProps<{
    code: number;
}>();

const { data: { value: obj} } = await useFetch(`/api/weather/codes/${code}`)

const mode = ref('day')

</script>

<template>
  <img v-if="mode === 'day'" :src="obj?.day.image" :alt="obj?.day.description" />
  <img v-if="mode === 'night'" :src="obj?.night.image" :alt="obj?.night.description" />
</template>