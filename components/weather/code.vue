<script lang="ts" setup>
const { code } = defineProps<{
    code: number | undefined;
}>();

const { data } = await useFetch(() => `/api/weather/codes/${code}`)

const image = ref({}) as Ref<{ 
  day: {
        description: string;
        image: string;
    };
    night: {
        description: string;
        image: string;
    }
}>

if (data.value) {
  image.value = data.value
}

watch(() => data.value, (newData, oldData) => {
	if (newData && newData !== oldData){
    image.value = newData
  }
})

</script>
<template>
  <img v-if='data' :src="image.day.image" :alt="image.day.description" />
</template>