<script lang="ts" setup>
const { videoName } = defineProps<{
    videoName: string,
  }>()

const videoString = `
<video autoplay loop playsinline width="100%" height="100%" aria-hidden="true">
  <source src="https://res.cloudinary.com/dvf7zwben/video/upload/v1741666482/${videoName}.mp4" type="video/mp4" />
</video>`

</script>

<template>
    <div class="background" v-html="videoString"></div>
</template>

<style lang="css">
.background {
	position: absolute;
	inset: 0;
	height: 100%;
	width: 100%;
}

.background::before {
	content: '';
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	display: block;
    position: absolute;
	/* backdrop-filter: blur(5px); */
}

video {
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	object-fit: cover;
}
</style>