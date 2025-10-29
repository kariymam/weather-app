<template>
  <ul>
    <li
      v-for="[name, { coordinates }] in locations" 
      :key="name"
    >
    <nuxt-link 
      :to="{ name: 'weather-coordinates', params: { coordinates: String(coordinates.join(',')) } }"
    >
      {{ name }}
    </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { IUserLocation } from '~/validators';
const {
	locations, 
} = defineProps<{
	locations: Array<[string,IUserLocation]>;
}>()
</script>