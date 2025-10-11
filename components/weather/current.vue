<script lang="ts" setup>
import type { openmeteo, WeatherDescriptions } from '~/types';

const { current,  descriptions } = defineProps<{
    descriptions: WeatherDescriptions[]
    current: openmeteo["current"]
}>()

const temperature = Math.ceil(current.temperature2m)

</script>

<template>
  <div class="current">
    <span class="currentTemperature">
      {{ temperature }}
    </span>
    <p>
      {{ descriptions.length && descriptions[0]["detailedForecast"] }}
    </p>
  </div>
</template>

<style>

.currentTemperature::after {
  content: '°';
}

.current {
  .currentTemperature {
    font-size: 4.35rem;
  }
}

</style>