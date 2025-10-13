<script lang="ts" setup>
const { temperature, description } = defineProps<{
    temperature: number
    description: string
}>()

</script>

<template>
  <div class="current">
    <span class="currentTemperature">
      {{ Math.ceil(temperature) }}
    </span>
    <span>
      Feels like {{ Math.ceil(temperature) }}
    </span>
    <p>
      {{ description }}
    </p>
  </div>
</template>

<style>

.currentTemperature::after {
  content: '°F';
  position: absolute;
  font-size: large;
  line-height: 4.35rem;
}

.current {
  .currentTemperature {
    font-size: 4.35rem;
  }
}

</style>