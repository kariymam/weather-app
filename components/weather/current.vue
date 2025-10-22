<template>
    <v-row class="currentTemperature">
      <div>
        <slot name="image" />
      </div>
      <h2>
        <slot name="temperature2m" :rounded="(temp: number) =>  Math.ceil(temp)">
        </slot>
      </h2>
    </v-row>
    <h3>
      Feels like 
      <slot name="apparentTemperature" :rounded="(temp: number) =>  Math.ceil(temp)"/>
    </h3>
    <details>
      <summary>More Information</summary>
      <p>
        <slot name="detailedForecast"/>
      </p>
    </details>
</template>

<style>

.currentTemperature {
  display: flex;
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
  display: flex;
  font-size: 4.35rem;
  position: relative;
}

</style>