<script lang="ts" setup>
import type { Geolocation, WeatherAPIResponse } from '~/types';

const { data: { value: cookie } } = await useFetch('/api/cookie');

onBeforeMount(async () => {
	if (cookie) {
		const parsedCookie = useParseCookieToLocation(cookie.location);
		locationStore().saveLocation(parsedCookie as Geolocation);
	}
});

const { weather, location } = defineProps<{
	weather: WeatherAPIResponse["weather"];
	location: Geolocation;
}>();

const videoString = `
<video autoplay loop playsinline width="100%" height="100%" aria-hidden="true">
  <source src="https://res.cloudinary.com/dvf7zwben/video/upload/v1741666482/${weather.data.videoURL}.mp4" type="video/mp4" />
</video>`

</script>

<template>
	<div>
		<WeatherDashboard>
			<template #one>
				<v-col>
					<h2>Current forecast in {{ location.place_name }}...</h2>
						<WeatherCurrent :current="weather.data?.current" :descriptions="weather.data?.descriptions[0]" />
				</v-col>
			</template>
			<template #two>
				{{ weather.status }}
			</template>
			<template #three>
				3
			</template>
			<template #four>
				<h2>The week ahead</h2>
				<v-divider />
					<WeatherBy7Day
						:daily="weather.data?.daily"
						:descriptions="weather.data?.descriptions"
						:status="weather.status"
					/>
			</template>
		</WeatherDashboard>
		<div class="background" v-html="videoString"></div>
	</div>
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
	background: rgba(var(--v-theme-background), 0.5);
	/* backdrop-filter: blur(5px); */
}

video {
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	object-fit: cover;
}
</style>