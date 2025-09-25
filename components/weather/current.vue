<script lang="ts" setup>
import type { WeatherAPIResponse } from '~/types';

const { current,  descriptions } = defineProps<{
    descriptions: WeatherAPIResponse["weather"]["data"]["descriptions"][0]
    current: WeatherAPIResponse["weather"]["data"]["current"]
}>()
</script>

<template>
  <div class="current">
    <span class="currentTemperature">{{ current && Math.floor(current.apparentTemperature) }}</span>
    <h3>{{ descriptions && descriptions.detailedForecast }}</h3>
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