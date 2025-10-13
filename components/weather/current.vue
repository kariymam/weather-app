<script lang="ts" setup>
import type { openmeteo, WeatherDescriptions } from '~/types';

const { current,  descriptions } = defineProps<{
    descriptions: WeatherDescriptions[]
    current: openmeteo['current']
}>()

const { value: { temperature2m, apparentTemperature } } = ref(current)

</script>

<template>
  <div class="current">
    <span class="currentTemperature">
      {{ Math.ceil(temperature2m) }}
    </span>
    <span>
      Feels like {{ Math.ceil(apparentTemperature) }}°F
    </span>
    <p>
      {{ descriptions.length && descriptions[0]["detailedForecast"] }}
    </p>
  </div>
</template>

<style>

.currentTemperature::after {
  content: '°F';
}

.current {
  .currentTemperature {
    font-size: 4.35rem;
  }
}

</style>