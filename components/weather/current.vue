<script lang="ts" setup>
const { temperature, description, weather_code } = defineProps<{
  temperature: number;
  description: string;
  weather_code: number;
}>()

</script>

<template>
    <v-row class="currentTemperature">
      <weather-code :code="weather_code" />
      <h2>
        {{ Math.ceil(temperature) }}
      </h2>
      <small>
        Feels like {{ Math.ceil(temperature) }}
      </small>
    </v-row>
    <v-expansion-panels>
      <v-expansion-panel
        title="Details"
      >
        <v-expansion-panel-text>
            {{ description }}
          </v-expansion-panel-text>
      </v-expansion-panel>
  </v-expansion-panels>
</template>

<style>

.currentTemperature {
  display: grid;
  grid-template-columns: 100px auto 1fr;
  align-items: center;
  grid-gap: 0.75em;
}

.currentTemperature h2::after {
  content: '°F';
  position: absolute;
  font-size: large;
  line-height: 4.35rem;
  right: -24px;
  margin-left: 0.5rem;
  top: 0;
  bottom: 0;
}

.currentTemperature h2 {
  font-size: 4.35rem;
  position: relative;
}

</style>