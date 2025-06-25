<script lang="ts" setup>
const { coordinates } = defineProps<{
    coordinates: number[];
}>()

const { data } = await useAsyncData(
  'weather',
  () => $fetch(`/api/weather/${coordinates}`)
)

console.log(data.value)
</script>

<template>
  <div>
    <!-- {{ data }} -->
  </div>
</template>