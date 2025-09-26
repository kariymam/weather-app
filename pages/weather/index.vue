<script lang="ts" setup>
import type { Geolocation, WeatherAPIResponse } from '~/types';

// const { data: { value: cookie } } = await useFetch('/api/cookie');

// onBeforeMount(async () => {
// 	if (cookie) {
// 		const parsedCookie = useParseCookieToLocation(cookie.location);
// 		locationStore().saveLocation(parsedCookie as Geolocation);
// 	}
// });

const { currentWeatherDescription } = storeToRefs(weatherStore())

const { weather, location } = defineProps<{
	weather: WeatherAPIResponse["weather"];
	location: Geolocation;
}>();

</script>

<template>
	<div>
		<WeatherDashboard>
			<template #one>
				<v-col>
					<h2>Current forecast in {{ location.place_name }}...</h2>
						<WeatherCurrent :current="weather.data?.current" :descriptions="currentWeatherDescription" />
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
		<UiVideo :videoName="weather.data.videoURL"></UiVideo>
	</div>
</template>