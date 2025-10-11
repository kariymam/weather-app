<script lang="ts" setup>
const { code } = defineProps<{
    code: number;
}>();

const imageObj = await $fetch(`/api/weather/codes/${code}`)

</script>
<template>
  <img :src="imageObj?.day.image" :alt="imageObj?.day.description" />
</template>