<script lang="ts" setup>
const { code } = defineProps<{
    code: {
        description: string;
        image: string;
    };
}>();
</script>
<template>
  <img :src="code.image" :alt="code.description" />
</template>