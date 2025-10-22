<script setup lang="ts">
definePageMeta({
	middleware: 'coordinates',
	layout: 'weather-base',
})

const {
	getCoordinates
} = useLocationStore()

const {
	weatherGov_alerts,
	weatherGov_descriptions,
	current,
	daily,
	updateOpenmeteoRes,
	updateWeatherGovAlerts,
	updateWeatherGovDescriptions,
} = await useWeatherStore();

// Initial load
const { data, status } = await useFetch(
	'/api/weather/', {
		query: { location: getCoordinates.value },
		lazy: true
	}
)
 onMounted(() => {
	const weather = data.value
	if (weather) {
		updateOpenmeteoRes(weather["openmeteo"])
		updateWeatherGovAlerts(weather["weatherGov_alerts"])
		updateWeatherGovDescriptions(weather["weatherGov_descriptions"])
	}
 })

// Handle updates
watch(() => data.value, (newData, oldData) => {
	if (newData && newData !== oldData) {
		const weather = newData as WeatherState
		updateOpenmeteoRes(weather["openmeteo"])
		updateWeatherGovAlerts(weather["weatherGov_alerts"])
		updateWeatherGovDescriptions(weather["weatherGov_descriptions"])
	}
})

</script>

<template>
	{{ status }}
	<WeatherAlerts :alerts="weatherGov_alerts">
	</WeatherAlerts>
	<WeatherDashboard>
		<template #one>
			<header>
				<h1>Right now...</h1>
			</header>
			<article>
				<WeatherCurrent>
					<template #image>
						<weather-code :code="current?.weather_code" />
					</template>
					<template #temperature2m="{ rounded }">
						{{ rounded(current?.apparentTemperature) }}
					</template>
					<template #apparentTemperature="{ rounded }">
						{{ rounded(current?.apparentTemperature) }}
					</template>
					<template #detailedForecast>
						{{ weatherGov_descriptions[0]['detailedForecast'] }}
					</template>
				</WeatherCurrent>
			</article>
		</template>
		<template #two>
			<header>
				<h1>The week ahead</h1>
			</header>
			<article>
				<WeatherBy7Day :daily="daily" :descriptions="weatherGov_descriptions">
				</WeatherBy7Day>
			</article>
		</template>
	</WeatherDashboard>
		<div>
			Video here
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
	display: block;
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	position: absolute;
	background: rgba(var(--v-theme-background), 0.5);
}

video {
	block-size: 100%;
	inline-size: 100%;
	inset-block: 0;
	object-fit: cover;
}
</style>