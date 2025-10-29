<template>
      <div>
        <slot name="image" />
      </div>
      <h3>
        <slot name="temperature2m" :rounded="(temp: number) =>  Math.ceil(temp)">
        </slot>
      </h3>
    <span>
      Feels like 
      <slot name="apparentTemperature" :rounded="(temp: number) =>  Math.ceil(temp)"/>
    </span>
    <details>
      <summary>More Information</summary>
      <p>
        <slot name="detailedForecast"/>
      </p>
    </details>
</template>